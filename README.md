
Git-Going is built using docker-compose. It is comprised of 
3 separate elements:

1. A Python Backend which leverages Flask in order to receive GET and POST calls from the frontend service, PyGithub to mine data from Github, and Pymongo to store mined data within a MongoDB database.

2. A React Frontend which utilizes React Router to create a multi-page application. This Frontend makes HTTP GET and POST calls to the Python Backend to mine data from GitHub.

3. A MongoDB Database to store and access mined data from GitHub.

# Python Backend
Git-Going uses the *python:3.6.8-alpine* Docker image.

## Setting up the Backend **BEFORE** building the project

Create a file called ***python-variables.env*** within git-going-backend/

Write the following within ***python-variables.env***. Dont worry about using quotes, the python script will interpret it properly. (The GITHUB_TOKEN is used to mine data from GitHub, and the two MONGO variables are necessary for Python to connect to the MongoDB database. You may leave them as 'devadmin' for development.)
```
GITHUB_TOKEN=GitHub-OAuth-Token-String
MONGO_USERNAME=devadmin
MONGO_PASSWORD=devadmin
```

All dependencies for the Backend are listed in the requirements.txt 

The Python Backend should be hosted at http://192.168.99.100:5000/. If this is incorrect, use the following command to see the IP of the docker-machine:
```CMD
docker-machine ip
```
Use that ip address and the application will be hosted on port 5000. 

# React Frontend

Hosted at http://192.168.99.100:3000/. More to come later.


# MongoDB Database

Hosted at http://192.168.99.100:27017/. More to come later. 


# Build the Project
```CMD
docker-compose build 
docker-compose up
```