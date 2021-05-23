#################### IMPORTS ####################
import random
from faker import Faker

from app.models import db, User, Channel


#################### FUNCTIONS ####################

# Seeds ChannelMessage Data
def seed_channel_messages():

    fake = Faker()

    users = User.query.all()
    channels = Channel.query.all()

    print(users[0].channels_in)

    # messages = [
    #     {'user_id': 1, 'channel_id': 1, "message":'Demo?'},
    #     {'user_id': 2, 'channel_id': 1, "message":'Demo'},
    #     {'user_id': 3, 'channel_id': 1, "message":'Yeah demo'},
    #     {'user_id': 4, 'channel_id': 1, "message":'This is demost interesting conversation'},
    #     {'user_id': 5, 'channel_id': 1, "message":'More like demoralizing'},
    #     {'user_id': 6, 'channel_id': 1, "message":'Its just meant to demonstrate the general idea'},
    # ]

    # for _ in range(100):
    #     channels.append(
    #         {'name':name,
    #         'user_id':random.randint(1,count),
    #         'is_channel':is_channel}
    #     )

    # for channel in channels:
    #     load_channel = Channel(name=channel['name'], user_id=channel['user_id'], is_channel=channel['is_channel'])
    #     db.session.add(load_channel)



    # db.session.commit()

# Uses a raw SQL query to TRUNCATE the channel_messages table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_channel_messages():
    db.session.execute('TRUNCATE channel_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
