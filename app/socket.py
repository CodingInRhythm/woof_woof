from flask_socketio import SocketIO, emit
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


@socketio.on("chat")
def handle_chat(data):
    '''
    listening for 'chat' event.  Message received is data.  We emit message (data param) back to everyone on chat channel, 
    broadcast True means all connected users will receive message,
    will want to change this.
    '''
    
    message = DirectMessage(sender_id = 1, recipient_id = 2, message=data['msg'])
    print(message)
    db.session.add(message)
    db.session.commit()
    emit("chat", data, broadcast=True)
