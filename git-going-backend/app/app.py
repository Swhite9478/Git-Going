# from mining_scripts.batchify import *
# from mining_scripts.mining import *
from pymongo import MongoClient # Import pymongo for interacting with MongoDB
from flask import Flask, request, escape
from flask_cors import CORS
import urllib.parse
import os


app = Flask(__name__)
CORS(app)
GITHUB_TOKEN = str(os.getenv('GITHUB_TOKEN'))
DEBUG_MODE = True #bool(os.getenv('DEBUG_MODE'))


@app.route('/api/repo/<string:owner>/<string:repo>', methods=['GET', 'POST'])
def getRepo(owner, repo):
    owner, repo = escape(owner), escape(repo)
    
    if request.method == 'GET':
        return f'Getting {escape(owner)}/{escape(repo)}'

    elif request.method == 'POST':
        return f'Posting {escape(owner)}/{escape(repo)}'
    

def verifyMongoDatabaseConnection():
    try: # See if we can connect to MongoDB
        MONGO_USERNAME = urllib.parse.quote_plus(str(os.getenv('MONGO_USERNAME')))
        MONGO_PASSWORD =  urllib.parse.quote_plus(str(os.getenv('MONGO_PASSWORD')))
        client = MongoClient('mongodb://%s:%s@192.168.99.100:27017/' % (MONGO_USERNAME, MONGO_PASSWORD)) 
        client.server_info() # will throw an exception if we cannot connect 

    except:
        raise ConnectionError("Unable to connect to MongoDB Database")


if __name__ == '__main__':
    print(' * Verifying MongoDB connection...')

    # Fail gracefully if we cannot connect to Mongo
    # verifyMongoDatabaseConnection()

    # Proceed if we are able to connect 
    # print(' * MongoDB connection verified! ')
    print(' * Starting Flask App at http://192.168.99.100:5000/ - not correct? try `docker-machine ip`')
    print(' * ENVIRONMENT VARIABLE: ', GITHUB_TOKEN)
    app.run(debug=DEBUG_MODE, host='0.0.0.0')    
