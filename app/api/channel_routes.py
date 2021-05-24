from flask import Blueprint, jsonify
# from flask_login import login_required
from app.models import Channel, ChannelMessage, User
from flask_login import current_user, login_user, logout_user, login_required

channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/')
# @login_required
def channels():
    # get channel for the current user
    user = User.query.filter(User.id == current_user.id).first()
    channels = {"channels": [channel.to_dict()
                             for channel in user.channels_in]}
    return channels


@ channel_routes.route('/<int:id>')
# @login_required
def channel(id):
    messages = ChannelMessage.query.filter(
        ChannelMessage.channel_id == id).all()
    # print(")()()()()()()()()()()())))))()()())(")
    # print(messages)
    # print(")()()()()()()()()()()())))))()()())(")
    return {"messages": [message.to_dict() for message in messages]}


# @channel_routes.route('/<int:id>')
# # @login_required
# def channel(id):
#     channel_messages = Channel.query.get(id)
#     return channel_messages.to_dict()
