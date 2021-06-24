from flask import session
from flask_socketio import SocketIO, emit, join_room
import os
from .models.models import db, ChannelMessage, DirectMessage

# Add after deploy
from engineio.payload import Payload

Payload.max_decode_packets = 500


# Setting origins variable to all when in dev, actual heroku app-url in production

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://woofwoof-app.herokuapp.com",
        "https://woofwoof-app.herokuapp.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("join")
def on_join(data):
    room=data['room']
    join_room(room)


@socketio.on('leave')
def on_leave(data):
    room=data['room']

@socketio.on("chat")
def handle_chat(data):
    '''
    listening for 'chat' event.  Message received is data.  We emit message (data param) back to everyone on chat channel,
    broadcast True means all connected users will receive message,
    will want to change this.
    '''
    message = ChannelMessage(user_id = data['id'], channel_id = data['room'], message=data['message'])
    db.session.add(message)
    db.session.commit()
    emit("chat", message.to_dict(), room=data['roomHash'])

@socketio.on("dm")
def handle_dm(data):
    message = DirectMessage(sender_id=data['sender_id'], recipient_id=data['recipient_id'], message=data["message"])
    db.session.add(message)
    db.session.commit()
    emit("dm", message.to_dict(), room=data["room"])

@socketio.on("dm_change")
def handle_dm_user_change(data):
    emit("dm_change", data, room="dm_user_change_room")
