from flask import request

from datetime import datetime

from helpers.respond import respond

from api import app
from api import socketio
from mongoapi import MongoAPI

@app.route('/api/users')
def get_users():

    page = int(request.args.get('page', 1))
    per_page = app.config['ITEMS_PER_PAGE']

    db = MongoAPI('users')
    (total, data) = db.read(page=page, per_page=per_page)

    prev_page = '/api/users?page={}'.format(page-1) if page > 1 else None
    next_page = '/api/users?page={}'.format(page+1) if page * per_page < total else None

    response = {}
    response['links'] = {
        'self': '/api/users?page={}'.format(page),
        'prev_page': prev_page,
        'next_page': next_page,
    }
    response['total_items'] = total
    response['items'] = data

    return respond(response, 200)

@app.route('/api/messages', methods=['POST'])
def add_message():
    data = request.json
    if data is None or data == {} or 'message' not in data or 'sender' not in data:
        return respond({'error': 'Please provide a message and a sender'}, 400)

    message = data.get('message')
    sender = data.get('sender')

    db_message = MongoAPI('messages')
    db_user = MongoAPI('users')

    response = db_message.write({'message': message, 'sender': sender.get('_id'), 'ts': datetime.now()})

    if response.get('status'):
        data = db_message.read_one(response.get('_id'))
        data_to_emit = {
            'message': message,
            'sender': sender,
            'timestamp': datetime.timestamp(data.get('ts'))
        }

        socketio.emit('receive-message', data_to_emit, broadcast=True)
        return respond(data, 200)
    else:
        return respond({'error': 'Internal error'}, 500)

@app.route('/api/users', methods=['POST'])
def join_user():

    data = request.json
    if data is None or data == {} or 'username' not in data:
        return respond({'error': 'Please provide a username'}, 400)

    username = data.get('username')
    db = MongoAPI('users')

    if len(db.read(filter={'username': username})[1]) != 0:
        return respond({'error': 'Choose a different username'})

    else:
        response = db.write({'username': username})

        if response:
            user_data = db.read(filter={'username': username})[1]
            socketio.emit('user-joined-room', user_data[0], broadcast=True)

            return respond(user_data[0], 200)

        else:
            return respond({'error': 'Internal error'}, 500)
