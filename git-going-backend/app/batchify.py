import math
from github import Github # Import PyGithub for mining data
from mining_scripts.config import *
import os


# Global constants

BATCH_SIZE = 500 # What size chunks we want 
NUM_OF_PREDEFINED_BATCH_SIZE = 0 # tuple index
LAST_BATCH_SIZE = 1 # tuple index
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')


g = Github(GITHUB_TOKEN, per_page=100) # authorization for the github API 


''' 
BatchedGeneratorTask

An object which contains a generator, and other various functions 
which we will use to chunkify pull request data into batchs
'''
class BatchedGeneratorTask(object):
    def __init__(self, gen, length):
        self.gen = gen
        self.length = length

    def __len__(self):
        return self.length

    def __iter__(self):
        return self.gen

    def __next__(self):
        return iter(self).__next__()

    def __str__(self):
        s = ""
        for item in range(len(self)):
            if item < len(self)-1:
                s += str(next(self)) + '\n'
            else:
                s += str(next(self))
        return s


'''
batchify

responsible for taking in the name of a repository (i.e. rails/rails)
and returning a list of generator objects of that given size to be 
sent off as celery tasks for mining.
'''
def batchify(repo_name):
    pulls = g.get_repo(repo_name).get_pulls('all')
    batched_data =  [iter(pulls[i:i+BATCH_SIZE]) for i in range(0, pulls.totalCount, BATCH_SIZE)]
    batch_length_tuple = get_batch_sizes_tuple(pulls)

    for batch_num in range(0, len(batched_data)):
        if batch_num < batch_length_tuple[NUM_OF_PREDEFINED_BATCH_SIZE]:
            batched_data[batch_num] = BatchedGeneratorTask(batched_data[batch_num], BATCH_SIZE)

        else:
            batched_data[batch_num] = BatchedGeneratorTask(batched_data[batch_num], 
                                                batch_length_tuple[LAST_BATCH_SIZE])

    return batched_data

'''
get_batch_number

for purposes of serialization being complex, this function will take in the 
name of a repo and an index number, and will return the batch of pull requests
'''
def get_batch_number(repo_name, batch_num):
    try:
        whole_batch = batchify(repo_name)
        batch = whole_batch[batch_num]
        return batch

        # if batch_num == len(whole_batch) - 1:
        #     return {"data":batch, "is_last_batch":True}

        # else:
        #     return {"data":batch, "is_last_batch":False}
    except Exception:
        pass 

'''
get_batch_sizes_tuple

takes in a PyGithub PullRequest object (i.e. g.get_repo("rails/rails").get_pulls("all"))
and returns a tuple that contains
1. the number of batches of the predifined size
2. the size of the last batch
'''
def get_batch_sizes_tuple(pulls):
    total_pulls = pulls.totalCount
    batches_total = pulls.totalCount / BATCH_SIZE
    num_predefined_batches = math.floor(batches_total)
    last_batch_len = round((batches_total - num_predefined_batches) * BATCH_SIZE)
    if  num_predefined_batches*BATCH_SIZE + last_batch_len  == total_pulls:
        return (num_predefined_batches, last_batch_len)
    else:
        raise ValueError(f"batch sizes not correct! \nTotal pulls: {total_pulls} \
        \nbatches total: {batches_total} \
        \nnum_batches_with_{BATCH_SIZE}: {num_predefined_batches} \
        \nlast batch len: {last_batch_len}"
        )
