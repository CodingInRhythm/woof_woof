#################### IMPORTS ####################
from faker import Faker
import requests

from app.models import db, User


#################### FUNCTIONS ####################

def randDog():
    dogObj=requests.get('https://dog.ceo/api/breeds/image/random').json()
    return dogObj['message']

# Seeds User Data
def seed_users():

    fake = Faker()

    users = [
        {'username':'Demo', 'email':'demo@aa.io', 'password':'password','firstname':'Demo','lastname':'Demo','profile_photo':'https://s1ack.s3.us-west-1.amazonaws.com/dog1.png'},
        {'username':'jesse_never_wong', 'email':'jesse@wong.com', 'password':'password','firstname':'Jesse','lastname':'Wong','profile_photo':'https://s1ack.s3.us-west-1.amazonaws.com/dog2.png'},
        {'username':'brad_i_would_simp_for_son', 'email':'brad@simpson.com', 'password':'password','firstname':'Brad','lastname':'Simpson','profile_photo':'https://s1ack.s3.us-west-1.amazonaws.com/dog3.png'},
        {'username':'juliet_shafto_the_rescue', 'email':'juliet@shafto.com', 'password':'password','firstname':'Juliet','lastname':'Shafto','profile_photo':'https://s1ack.s3.us-west-1.amazonaws.com/dog4.png'},
        {'username':"mitchell_reiss's_pieces", 'email':'mitchel@reiss.com', 'password':'password','firstname':'Mitchell','lastname':'Reiss','profile_photo':'https://s1ack.s3.us-west-1.amazonaws.com/dog5.png'},
        {'username':'jeff_granof_the_grey', 'email':'jeff@granof.com', 'password':'password','firstname':'Jeff','lastname':'Granof','profile_photo':'https://s1ack.s3.us-west-1.amazonaws.com/dog6.png'},
        {'username':'zach_watts_in_the_box', 'email':'zach@watts.com', 'password':'password','firstname':'Zach','lastname':'Watts','profile_photo':'https://s1ack.s3.us-west-1.amazonaws.com/dog7.png'},
    ]

    for _ in range(50):
        users.append({'username':fake.user_name(),
        'email':fake.free_email(),
        'password':fake.password(length=10),
        'firstname':fake.first_name(),
        'lastname':fake.last_name(),
        'profile_photo':randDog()})

    for user in users:
        load_user = User(username=user['username'], email=user['email'], password=user['password'], firstname=user['firstname'], lastname=user['lastname'], profile_photo=user['profile_photo'])
        db.session.add(load_user)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
