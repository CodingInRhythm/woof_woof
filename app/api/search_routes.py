#################### IMPORTS ####################
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User

from app.models.models import db, User

#################### SETUP ####################
search_routes = Blueprint('search', __name__)


#################### ROUTES ####################
@search_routes.route('/', methods=['GET','POST'])
def search():
    value=request.json['searchParam']
    print(value)
    users = User.query.filter(User.firstname.ilike(f'{value}%')).limit(10).all()
    return {"users": [user.to_dict() for user in users]}
