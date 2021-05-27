#################### IMPORTS ####################
from flask import Blueprint, jsonify, session
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

# @login_required
@user_routes.route('/online/<int:userId>', methods=['PUT'])
def online_status(userId):
    if not current_user.is_authenticated:
        return {'errors': ['Unauthorized']}

    status= request.json['status']

    user = User.query.get(id)
    print(status)
    user.online_status = status
    db.session.commit()

    return {user: user.to_dict_basic()}

# @user_routes.route('/offline/<int:id>', methods=['PUT'])
# @login_required
# def online_user(id):
#     user = User.query.get(id + 1)
#     # user.online_status = False
#     # db.session.commit()
#     return user.to_dict_basic()