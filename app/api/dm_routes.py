from flask import Blueprint, jsonify
# from flask_login import login_required
from app.models import DirectMessage, User, db
from flask_login import current_user

dm_routes = Blueprint('dms', __name__)


@dm_routes.route('/')
def direct_messages():
    # users = User.query.filter(User.id == current_user.id).first()
    # dms = DirectMessage.query.all()
    sent_messages = DirectMessage.query.filter(
        DirectMessage.sender_id == current_user.id).all()
    received_messages = DirectMessage.query.filter(
        DirectMessage.recipient_id == current_user.id).all()
    users = []
    for user in sent_messages:
        if (user.recipient not in users and user.recipient_id != current_user.id):
            users.append(user.recipient)
    for user in received_messages:
        if (user.user not in users and user.sender_id != current_user.id):
            users.append(user.user)
    return {'dm_people': [user.to_dict() for user in users]}
    # return {'direct_messages': [message.to_dict() for message in direct_messages]}

    #
    # users = User.query.all()
    # return {"users": [user.to_dict() for user in dm_users]}

# direct_messages.id, direct_messages.sender_id, direct_messages.recipient_id, users.id, users.firstname, users.lastname

@dm_routes.route('/<int:recipient_id>', methods=["POST"])
def add_dm(recipient_id):
    print(recipient_id)
    db.session.add(DirectMessage())
    return "Hello"
