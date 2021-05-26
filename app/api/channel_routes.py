from flask import Blueprint, jsonify, request
from app.models import Channel, ChannelMessage, User, db
from flask_login import current_user, login_user, logout_user, login_required

channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/')
def channels():
    user = User.query.filter(User.id == current_user.id).first()
    channels = {"channels": [channel.to_dict()
                             for channel in user.channels_in]}
    return channels


@channel_routes.route('/', methods=['POST'])
def add_channel():
    users_in = [User.query.get(request.json['user_id'])]
    # print("********************************")
    channel = Channel(name=request.json['name'], user_id=request.json['user_id'],
                      is_channel=request.json['is_channel'], users_in=users_in)

    db.session.add(channel)
    db.session.commit()
    return {"channel": channel.to_dict()}


@ channel_routes.route('/<int:id>')
def channel(id):
    messages = ChannelMessage.query.filter(
        ChannelMessage.channel_id == id).all()
    return {"messages": [message.to_dict() for message in messages]}
