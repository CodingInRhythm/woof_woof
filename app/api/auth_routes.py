#################### IMPORTS ####################
from flask import Blueprint, jsonify, session, request
from app.models import User, db, Channel
from app.aws import allowed_file, get_unique_filename, upload_file_to_s3, delete_file_from_s3
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import EditForm
from flask_login import current_user, login_user, logout_user, login_required


#################### SETUP ####################
auth_routes = Blueprint('auth', __name__)


#################### FUNCTIONS ####################
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

#################### ROUTES ####################
@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter((User.email==form.data['credential']) | (User.username==form.data['credential'])).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    image = form.data['profile_image']
    url=None

    if image=='null' or image=='undefined':
        image=None

    if image:
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename, form.data['username'])

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        url = upload["url"]

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            firstname=form.data['firstname'],
            lastname=form.data['lastname'],
            profile_photo=url,

        )
        db.session.add(user)
        channel = Channel.query.get(2)
        channel.users_in.append(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/<int:id>/', methods=['PUT'])
def edit_user(id):
    """
    Creates a new user and logs them in
    """
    user = User.query.get(id)

    if not user:
        return {"errors": "User not found"}, 400

    form = EditForm()

    image = form.data['profile_image']

    if image=='null' or image=='undefined':
        image=None

    url = None

    if image:
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        if form.data['username'] and form.data['username']!= user.username:
            image.filename = get_unique_filename(image.filename, form.data['username'])
        else:
            image.filename = get_unique_filename(image.filename, user.username)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        url = upload["url"]


    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if form.data['username'] and form.data['username']!= user.username:
            existing_user = User.query.filter(User.username==form.data['username']).first()
            if existing_user:
                return {"errors": ["Username is already taken"]}, 409
            user.username=form.data['username']
        if form.data['email'] and form.data['email']!= user.email:
            existing_user = User.query.filter(User.email==form.data['email']).first()
            if existing_user:
                return {"errors": ["Email is already in use"]}, 409
            user.email=form.data['email']
        if form.data['firstname'] and form.data['firstname']!= user.firstname:
            user.firstname=form.data['firstname']
        if form.data['lastname'] and form.data['lastname']!= user.lastname:
            user.lastname=form.data['lastname']
        if url and url!= user.profile_photo:
            if user.profile_photo and ('amazonaws' in user.profile_photo):
                    key=user.profile_photo.split('/')[-1]
                    res = delete_file_from_s3(key)
                    if 'success' not in res:
                        return res, 400
            user.profile_photo=url
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
