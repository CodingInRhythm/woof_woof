#################### IMPORTS ####################
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Channel

from app.models.models import db, User

#################### SETUP ####################
search_routes = Blueprint('search', __name__)


#################### ROUTES ####################
@search_routes.route('/', methods=['GET','POST'])
def search():
    value=request.json['searchAllParam']
    users = User.query.filter(User.firstname.ilike(f'{value}%') | User.lastname.ilike(f'{value}%') | User.username.ilike(f'{value}%') | User.email.ilike(f'{value}%')).limit(10).all()
    channels = Channel.query.filter(Channel.name.ilike(f'{value}%')).limit(10).all()
    return {"users": [user.to_dict() for user in users],
            "channels": [channel.to_dict() for channel in channels],
            "values": [user.to_dict() for user in users]+[channel.to_dict() for channel in channels]}


@search_routes.route('/users', methods=['GET','POST'])
def search_users():
    value=request.json['searchParam']
    users = User.query.filter(User.firstname.ilike(f'{value}%') | User.lastname.ilike(f'{value}%') | User.username.ilike(f'{value}%') | User.email.ilike(f'{value}%')).limit(15).all()
    return {"users": [user.to_dict() for user in users]}
