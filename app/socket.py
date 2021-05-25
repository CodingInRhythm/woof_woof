from flask import session
from flask_socketio import SocketIO, emit, join_room
import os
from .models.models import db, ChannelMessage

# Setting origins variable to all when in dev, actual heroku app-url in production

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://actual-app-url.herokuapp.com",
        "https://actual-app-url.herokuapp.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("join")
def on_join(data):
    room=data['room']
    print("room name", room)
    join_room(room)

    #what does 'connected' do?
    emit('Connected', room=room)


@socketio.on('leave')
def on_leave(data):
    room=data['room']
    emit('Disconnected', room=room)

@socketio.on("chat")
def handle_chat(data):
    '''
    listening for 'chat' event.  Message received is data.  We emit message (data param) back to everyone on chat channel,
    broadcast True means all connected users will receive message,
    will want to change this.
    '''
    # print('TEST', data)
    # message = ChannelMessage(user_id = data['id'], channel_id = data['room'], message=data['message'])
    # db.session.add(message)
    # db.session.commit()
    emit("chat", data, room=data['room'])
