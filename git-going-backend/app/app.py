# from mining_scripts.batchify import *
# from mining_scripts.mining import *
from flask import Flask
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
GITHUB_TOKEN = str(os.getenv('GITHUB_TOKEN'))
DEBUG_MODE = bool(os.getenv('DEBUG_MODE'))

@app.route('/')
def hello():
    return 'Hello World!' 

@app.route('/goodbye')
def goodbye():
    return 'Goodbye Cruel World! I am goddamn begging you'

if __name__ == '__main__':
    print(' * Starting Flask App at http://192.168.99.100:5000/ - not correct? try `docker-machine ip`')
    print(' * ENVIRONMENT VARIABLE: ', GITHUB_TOKEN)
    app.run(debug=DEBUG_MODE, host='0.0.0.0')    
