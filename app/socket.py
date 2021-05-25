from flask import session
from flask_socketio import SocketIO, emit, join_room
import os
from .models.models import db, DirectMessage

#Setting origins variable to all when in dev, actual heroku app-url in production

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://actual-app-url.herokuapp.com",
        "https://actual-app-url.herokuapp.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)


# @socketio.on("join")
# def join_room():
#     channel = session['channel']
#     join_room(channel)

@socketio.on("chat", namespace="")
def handle_chat(data):
    '''
    listening for 'chat' event.  Message received is data.  We emit message (data param) back to everyone on chat channel,
    broadcast True means all connected users will receive message,
    will want to change this.
    '''
    join_room(session['channel'])
    # message = DirectMessage(sender_id = 1, recipient_id = 2, message=data['msg'])
    # db.session.add(message)
    # db.session.commit()
    emit("chat", data, to=session['channel'])
