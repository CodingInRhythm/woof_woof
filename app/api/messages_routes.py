#################### IMPORTS ####################
from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required

from app.models.models import db, DirectMessage, ChannelMessage


#################### SETUP ####################
messages_routes = Blueprint('messages', __name__)


#################### FUNCTIONS ####################


#################### DIRECT MESSAGE ROUTES ####################

# GET  all dm's from current user and another specified user #
@messages_routes.route('/dm/<int:recipient_id>')
def dm_get(recipient_id):
    """
    GET all direct messages from current user and another specified user.
    """
    if not current_user.is_authenticated:
        return {'errors': ['Unauthorized']}

    direct_messages = DirectMessage.query.filter(DirectMessage.sender_id.in_((current_user.id, recipient_id)),DirectMessage.recipient_id.in_((current_user.id, recipient_id))).all()
    return {'direct_messages':[message.to_dict() for message in direct_messages]}

# PUT (edit) specified direct message #
@messages_routes.route('/dm/<int:direct_message_id>', methods=['PUT'])
def dm_put(direct_message_id):
    """
    PUT (edit) specified direct message.
    """
    if not current_user.is_authenticated:
        return {'errors': ['Unauthorized']}

    message = request.json['message']

    direct_message = DirectMessage.query.get(direct_message_id)
    direct_message.message = message
    db.session.commit()

    return {'direct_message':direct_message.to_dict()}

# DELETE specified direct message #
@messages_routes.route('/dm/<int:direct_message_id>', methods=['DELETE'])
def dm_delete(direct_message_id):
    """
    DELETE specified direct message.
    """
    if not current_user.is_authenticated:
        return {'errors': ['Unauthorized']}

    direct_message = DirectMessage.query.get(direct_message_id)
    db.session.delete(direct_message)
    db.session.commit()

    return {'direct_message':direct_message.to_dict_basic()}

#################### CHANNEL MESSAGE ROUTES ####################

# GET  all message in a specified channel #
@messages_routes.route('/channel/<int:channel_id>')
def channel_message_get(channel_id):
    """
    GET all channel messages for specified channel.
    """
    if not current_user.is_authenticated:
        return {'errors': ['Unauthorized']}

    channel_messages = ChannelMessage.query.filter_by(channel_id=channel_id).order_by(ChannelMessage.id).all()
    return {'channel_messages':[message.to_dict() for message in channel_messages]}


# PUT (edit) specified direct message #
@messages_routes.route('/channel/<int:channel_message_id>', methods=['PUT'])
def channel_message_put(channel_message_id):
    """
    PUT (edit) specified channel message.
    """
    if not current_user.is_authenticated:
        return {'errors': ['Unauthorized']}

    message = request.json['message']

    channel_message = ChannelMessage.query.get(channel_message_id)
    channel_message.message = message
    db.session.commit()

    return {'channel_message':channel_message.to_dict()}

# DELETE specified channel message #
@messages_routes.route('/channel/<int:channel_message_id>', methods=['DELETE'])
def channel_message_delete(channel_message_id):
    """
    DELETE specified channel message.
    """
    if not current_user.is_authenticated:
        return {'errors': ['Unauthorized']}

    channel_message = ChannelMessage.query.get(channel_message_id)
    db.session.delete(channel_message)
    db.session.commit()

    return {'channel_message':channel_message.to_dict_basic()}