from flask import Blueprint, jsonify
# from flask_login import login_required
from app.models import DirectMessage, User
from flask_login import current_user

dm_routes = Blueprint('dms', __name__)


@dm_routes.route('/')
def direct_messages():
    # users = User.query.filter(User.id == current_user.id).first()
    # dms = DirectMessage.query.all()
    print("***************************************")
    print("***************************************")
    direct_messages = DirectMessage.query.filter(
        DirectMessage.sender_id == current_user.id).all()
    return {'direct_messages': [message.to_dict() for message in direct_messages]}
    #
    # users = User.query.all()
    # return {"users": [user.to_dict() for user in dm_users]}

# direct_messages.id, direct_messages.sender_id, direct_messages.recipient_id, users.id, users.firstname, users.lastname
