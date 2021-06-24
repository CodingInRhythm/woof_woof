from flask import Blueprint, jsonify
from app.models import DirectMessage, User, db
from flask_login import current_user

dm_routes = Blueprint('dms', __name__)


@dm_routes.route('/')
def direct_messages():
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

@dm_routes.route('/<int:id>')
def new_dm_user(id):
    new_dm_user = User.query.filter(User.id == id).all()
    return {'dm_user': new_dm_user}

@dm_routes.route('/<int:id>', methods=["PUT"])
def edit_dm_user(id):
    pass
