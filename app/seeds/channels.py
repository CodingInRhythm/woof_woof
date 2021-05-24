#################### IMPORTS ####################
import random
from faker import Faker

from app.models import db, User, Channel


#################### FUNCTIONS ####################

# Seeds Channel Data
def seed_channels():

    fake = Faker()

    users = User.query.all()

    channels = [
        {'name':'DemoChannel', 'user_id': 1, 'is_channel':True, 'users_in':[users[0],users[1]]},
        {'name':'JuiceFanz', 'user_id': 1, 'is_channel':True, 'users_in':[users[0], users[1], users[2], users[3], users[4], users[5], users[6], users[7]]}
    ]

    for _ in range(100):
        is_channel = True if random.randint(1,10)!=10 else False
        name = fake.slug() if is_channel else 'Group'
        user_id = random.randint(1,len(users))

        temp_users = User.query.filter(User.id != user_id).all()

        users_in=[User.query.get(user_id)]
        users_in+=random.sample(temp_users, random.randint(0,3))

        channels.append(
            {'name':name,
            'user_id':user_id,
            'is_channel':is_channel,
            'users_in':users_in}
        )

    for channel in channels:
        load_channel = Channel(name=channel['name'], user_id=channel['user_id'], is_channel=channel['is_channel'], users_in=channel['users_in'])
        db.session.add(load_channel)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the channels table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()