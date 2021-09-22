from flask import jsonify

from app import app

from databaseRep import get

@app.route('/users')
def get_users():
    users = get('users')
    return jsonify(users)

@app.route('/rooms')
def get_rooms():
    rooms = get('rooms')
    return jsonify(rooms)
