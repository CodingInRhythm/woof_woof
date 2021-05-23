#################### IMPORTS ####################
from faker import Faker

from app.models import db, User


#################### FUNCTIONS ####################

# Seeds User Data
def seed_users():

    fake = Faker()

    users = [
        {'username':'Demo', 'email':'demo@aa.io', 'password':'password','firstname':'Demo','lastname':'Demo',},
        {'username':'jesse_never_wong', 'email':'jesse@simpson.co', 'password':'password','firstname':'Jesse','lastname':'Wong',},
        {'username':'brad_i_would_simp_for_son', 'email':'brad@simpson.com', 'password':'password','firstname':'Brad','lastname':'Simpson',},
        {'username':'juliet_shafto_the_rescue', 'email':'juliet@shafto.com', 'password':'password','firstname':'Juliet','lastname':'Shafto',},
        {'username':"mitchell_reiss's_pieces", 'email':'mitchel@reiss.com', 'password':'password','firstname':'Mitchell','lastname':'Reiss',},
        {'username':'jeff_granof_the_grey', 'email':'jeff@granof.com', 'password':'password','firstname':'Jeff','lastname':'Granof',},
        {'username':'zach_watts_up_dood', 'email':'zach@watts.com', 'password':'password','firstname':'Zach','lastname':'Watts',},
    ]

    for _ in range(50):
        users.append({'username':fake.user_name(),
        'email':fake.free_email(),
        'password':fake.password(length=10),
        'firstname':fake.first_name(),
        'lastname':fake.last_name()})

    for user in users:
        load_user = User(username=user['username'], email=user['email'], password=user['password'], firstname=user['firstname'], lastname=user['lastname'])
        db.session.add(load_user)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
