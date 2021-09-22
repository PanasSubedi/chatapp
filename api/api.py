from flask import Flask, request
from flask_socketio import *
from flask_cors import CORS

from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

socketio = SocketIO(app, cors_allowed_origins="*")

from routes import *
#from sockets import *
from errors import *

if __name__ == '__main__':
    socketio.run(app, debug=True)
