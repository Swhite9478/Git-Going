#!/usr/bin/env python
# -*- coding: utf-8 -*-
# mining.py
# Created by Stephen White
# Date: 12/15/2019
# Purpose: This script will provide the necessary functionality to store json data
#          from GitHub's API into the MongoDB database of our choosing 

from pymongo import MongoClient # Import pymongo for interacting with MongoDB
from github import Github # Import PyGithub for mining data
from mining_scripts.config import *
from retrying import retry
import os
import time
import urllib.parse
from datetime import datetime
from mining_scripts.batchify import BatchedGeneratorTask

GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
MONGO_USERNAME = urllib.parse.quote_plus(str(os.getenv('MONGO_USERNAME')))
MONGO_PASSWORD =  urllib.parse.quote_plus(str(os.getenv('MONGO_PASSWORD')))


# precent issues with forking 
if os.getpid() == 0:
    # Initial connection by parent process
    client = MongoClient('mongodb://%s:%s@192.168.99.100:27017/' % (MONGO_USERNAME, MONGO_PASSWORD)) # Where are we connecting
else: 
    # No need to reconnect if we are already connected
    client = MongoClient('mongodb://%s:%s@192.168.99.100:27017/' % (MONGO_USERNAME, MONGO_PASSWORD) connect=False)

db = client.Git_Going # The specific mongo database we are working with 

repos = db.repos # collection for storing all of a repo's main api json information 

pull_requests = db.pullRequests # collection for storing all pull requests for all repos 

pull_batches = db.pullBatches

g = Github(GITHUB_TOKEN, per_page=100) # authorization for the github API 


# Wrapper function that will perform all mining steps necessary when
# provided with the repository name
def mine_and_store_all_repo_data(repo_name):

    # Use pygit to eliminate any problems with users not spelling the repo name
    # exactly as it is on the actual repo 
    pygit_repo = g.get_repo(repo_name)

    # mine and store the main page josn
    mine_repo_page(pygit_repo)

    # mine and store all pulls for this repo 
    mine_pulls_from_repo(pygit_repo)

    visualization_data = extract_pull_request_model_data(pygit_repo)


# Method to download a repo's main json and place it in the 
# db.repos collection for future parsing 
def mine_repo_page(pygit_repo):
    repos.update_one(pygit_repo.raw_data, {"$set": pygit_repo.raw_data}, upsert=True)
    return 


# Function that will delete all repos from the repos collection of the mongodb database
def delete_all_repos_from_repo_collection():
    repos.delete_many({})
    return


# Method to find a specific repo in the repos collection and delete it 
def delete_specific_repo_from_repo_collection(repo_name):
    pygit_repo = g.get_repo(repo_name)
    repos.delete_one({"full_name":pygit_repo.full_name})
    return

# Method to remove all pull requests from the pull request collection 
def delete_all_pulls_from_pull_request_collection():
    pull_requests.delete_many({})
    return


# Method to delete all pull requests belonging to a specific repo 
# from the pullRequests collection 
def delete_specifc_repos_pull_requests(repo_name):
    pygit_repo = g.get_repo(repo_name)
    pull_requests.delete_many({"url": {"$regex": pygit_repo.full_name}})
    return

def rate_limit_is_reached():
    num_requests_remaining = get_number_of_remaining_requests()
    if num_requests_remaining == 0:
        return True 
    else:
        return False 

def get_number_of_remaining_requests():
    g = Github(GITHUB_TOKEN, per_page=100) # Update authorization to have up to date requests remaining 
    return  g.rate_limiting[0] # the current number of remaining requests

def get_num_seconds_until_rate_limit_reset():
    current_time_unix = time.mktime(datetime.now().timetuple())
    rate_limit_reset_time_unix = g.rate_limiting_resettime
    num_seconds=rate_limit_reset_time_unix-current_time_unix
    num_minutes=num_seconds / 60
    return num_seconds

def wait_for_request_rate_reset():
    time.sleep(get_num_seconds_until_rate_limit_reset())
    time.sleep(1)  
    g = Github(GITHUB_TOKEN, per_page=100) # Update authorization to have up to date requests remaining 

    return

# Method to download all pull requests of a given repo and 
# put them within the db.pullRequests collection 
def mine_pulls_from_repo(pygit_repo):
    # Retrieve all pull request numbers associated with this repo 
    pulls = pygit_repo.get_pulls('all')
    
    for pull in pulls:
        
        # Only mine data when we have remaining requests
        if rate_limit_is_reached():
            wait_for_request_rate_reset() # Dynamically wait for a given number of seconds
        else:
            mine_specific_pull(pygit_repo.full_name, pull) # Go mine stuff!

    return 

def increase_collected_batches_count(repo_name):
    document = pull_batches.find_one({"repo":repo_name})
    current_count = pull_batches.find_one({"repo":repo_name})["collected_batches"] 
    pull_batches.update_one(document, {"$set": {"collected_batches": current_count + 1}}, upsert=False)
    return 

def increase_attempted_batches_count(repo_name):
    document = pull_batches.find_one({"repo":repo_name})
    current_count = pull_batches.find_one({"repo":repo_name})["attempted_batches"] 
    pull_batches.update_one(document, {"$set": {"attempted_batches": current_count + 1}}, upsert=False)
    return 

def mine_pulls_batch(pulls_batch, repo_name):
    increase_attempted_batches_count(repo_name)
    try:
        for pull in range(len(pulls_batch)):
            if rate_limit_is_reached():
                wait_for_request_rate_reset() # Dynamically wait for a given number of seconds
            else:
                mine_specific_pull(next(pulls_batch)) # Move the iterator to the next pull request & mine
        increase_collected_batches_count(repo_name)
        # gc.collect()
        return True
    except Exception: 
        return False

# Mine and store specific repo. If there are any errors (other than 503),
# retry with exponential backoff 10 times. Fail after 10th attempt 
# @retry(wait_exponential_multiplier=1000, wait_exponential_max=10000, stop_max_attempt_number=10)
def mine_specific_pull(pull):
    try:
        pull_requests.update_one(pull.raw_data, {"$set": pull.raw_data}, upsert=True)
        
    except Exception as e:
        # if this repo doesn't exist, don't mine it 
        if e == 500 or e == 404:
            logger.info('GITHUB EXCEPTION: {0} for PULL {1}. PULL INACCESSIBLE, PASSING.'.format(e, pull.number))
            pass
        # TODO: Else, send the administrator an email to alert them of an error
    
# Helper method to find a specific repo's main api page json 
def find_repo_main_page(repo_name):
    # Use pygit to eliminate any problems with users not spelling the repo name
    # exactly as it is on the actual repo 
    try:
        pygit_repo = g.get_repo(repo_name)
        return repos.find_one({"full_name":pygit_repo.full_name})
    except Exception as e:
        return e


# Helper method to find and return a list of all pull request json files 
# belonging to a specific repo 
def find_all_pull_requests_from_a_specific_repo(repo_name):
    # Use pygit to eliminate any problems with users not spelling the repo name
    # exactly as it is on the actual repo 
    pygit_repo = g.get_repo(repo_name)

    # Obtain a list of all the pull requests matching the repo's full name 
    pulls = pull_requests.find({"url": {"$regex": pygit_repo.full_name}})

    return pulls

def count_all_pull_requests_from_a_specifc_repo(repo_name):
    pygit_repo = g.get_repo(repo_name)

    num_pulls = pull_requests.count_documents({"url": {"$regex": pygit_repo.full_name}})

    return num_pulls


# Method to retrieve all repos in the repo collection
def get_all_repos():
    return repos.find({})


# Method to retrieve every pull request in the pullRequest collection
def get_all_pull_requests():
    return pull_requests.find({})
     

# Method to delete all json files from every collection 
def delete_all_contents_from_every_collection():
    delete_all_repos_from_repo_collection()
    delete_all_pulls_from_pull_request_collection()
    return 


# Method to delete all jsons belonging to a specific repo from every collection 
def delete_all_contents_of_specific_repo_from_every_collection(repo_name):
    delete_specific_repo_from_repo_collection(repo_name)
    delete_specifc_repos_pull_requests(repo_name)
    return

