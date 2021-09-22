from flask import request

from api import socketio

from databaseRep import add, get, set

from next_id import get_next_id

@socketio.on('joinRoom')
def joined_room(data):

    print('<{} joined room>'.format(data.get('username')))

    current_user_dict = {}
    current_user_dict['sid'] = request.sid
    current_user_dict['id'] = get_next_id('user')
    current_user_dict['username'] = data.get('username')

    add('users', current_user_dict)

    socketio.emit('userJoinedRoom', current_user_dict, broadcast=True)

@socketio.on('disconnect')
@socketio.on('logout')
def disconnected():

    users = get('users')
    dc_user = {}
    new_users = []

    for user in users:
        if user['sid'] == request.sid:
            dc_user = user
        else:
            new_users.append(user)

    set('users', new_users)

    if len(dc_user.keys()) != 0:
        print('<{} disconnected>'.format(dc_user['username']))
        socketio.emit('userLeftRoom', dc_user, broadcast=True)

@socketio.on('sendMessage')
def message_sent(data):
    socketio.emit('receiveMessage', data, broadcast=True)
