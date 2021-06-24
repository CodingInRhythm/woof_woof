from flask import Blueprint, jsonify, request
from app.models import Channel, ChannelMessage, User, db
from flask_login import current_user, login_user, logout_user, login_required

channel_routes = Blueprint('channels', __name__)

#GET ALL CHANNELS IN DATABASE

@channel_routes.route('/all')
def all_channels():
    channels = Channel.query.all()
    return {"channels": [channel.to_dict() for channel in channels]}

# GET CHANNELS FOR THE CURRENT USER
@channel_routes.route('/')
def channels():
    user = User.query.filter(User.id == current_user.id).first()
    channels = {"channels": [channel.to_dict()
                             for channel in user.channels_in]}
    return channels


# ADD NEW CHANNEL
@channel_routes.route('/', methods=['POST'])
def add_channel():
    users_in = [User.query.get(request.json['user_id'])]
    channel = Channel(name=request.json['name'], user_id=request.json['user_id'],
                      is_channel=request.json['is_channel'], users_in=users_in)

    db.session.add(channel)
    db.session.commit()
    return {"channel": channel.to_dict()}


# JOIN NEW CHANNEL
@channel_routes.route('/join', methods=['POST'])
def join_channel():
    user = User.query.get(request.json['user_id'])
    channel = Channel.query.get(request.json['channel_id'])
    channel.users_in.append(user)
    db.session.commit()
    return {"channel": channel.to_dict()}


# EDIT CHANNEL
@channel_routes.route('/<int:channel_id>', methods=['PUT'])
def edit_channel(channel_id):

    if not current_user.is_authenticated:
        return {'errors': ['Unauthorized']}

    channel = Channel.query.get(channel_id)
    channel.name = request.json
    db.session.commit()
    return {"channel": channel.to_dict()}


# LEAVE CHANNEL
@channel_routes.route('/<int:channel_id>', methods=['POST'])
def delete_channel(channel_id):
    if not current_user.is_authenticated:
        return {'errors': ['Unauthorized']}

    user = User.query.filter(User.id == current_user.id).first()
    channel = Channel.query.get(channel_id)

    user.channels_in.remove(channel)
    db.session.commit()

    return {"channel": channel.to_dict()}


# GET MESSAGES FOR THE SELECTED MESSAGE
@ channel_routes.route('/<int:id>')
def channel(id):
    messages = ChannelMessage.query.filter(
        ChannelMessage.channel_id == id).all()
    return {"messages": [message.to_dict() for message in messages]}
