from flask import Blueprint, jsonify
# from flask_login import login_required
from app.models import Channel, ChannelMessage

channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/')
# @login_required
def channels():
    console.log("******************************************************")
    console.log("hello world")
    console.log("******************************************************")
    # channels = Channel.query.all()
    # dict = {"channels": [channel.to_dict() for channel in channels]}
    # console.log(jsonify(dict))
    return


# @channel_routes.route('/<int:id>')
# @login_required
# def channel(id):
#     messages = ChannelMessage.query.filter(
#         ChannelMessage.channel_id == id).all()
#     # console.log({"messages": [message.to_dict() for message in message]})
#     return {"messages": [message.to_dict() for message in message]}
