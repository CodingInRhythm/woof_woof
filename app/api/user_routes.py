#################### IMPORTS ####################
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User

from app.models.models import db, User

#################### SETUP ####################
user_routes = Blueprint('users', __name__)


#################### ROUTES ####################
@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/online/<int:userId>', methods=['PUT'])
def online_status(userId):
    if not current_user.is_authenticated:
        return {'errors': ['Unauthorized']}

    status = request.json['status']
    user = User.query.get(userId)

    user.online_status = status
    db.session.commit()

    return user.to_dict()
