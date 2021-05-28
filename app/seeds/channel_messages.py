#################### IMPORTS ####################
import random
from faker import Faker

from app.models import db, User, Channel, ChannelMessage


#################### FUNCTIONS ####################

# Seeds ChannelMessage Data
def seed_channel_messages():

    fake = Faker()

    channel_count = len(Channel.query.all())

    messages = [
        {'user_id': 1, 'channel_id': 1, "message": '<p class="chat__text">Demo?</p>'},
        {'user_id': 2, 'channel_id': 1, "message": '<p class="chat__text">Demo</p>'},
        {'user_id': 3, 'channel_id': 1, "message": '<p class="chat__text">Demo?</p>'},
        {'user_id': 4, 'channel_id': 1, "message": '<p class="chat__text">Juice</p>'},
        {'user_id': 5, 'channel_id': 1, "message": '<p class="chat__text">Demo?</p>'},
        {'user_id': 7, 'channel_id': 1, "message": '<p class="chat__text">Demo</p>'},
        {'user_id': 6, 'channel_id': 1, "message": '<p class="chat__text">Bucks</p>'},
    ]

    for _ in range(200):
        channel_id = random.randint(1,channel_count)
        channel = Channel.query.get(channel_id)

        user_id = random.sample(channel.users_in,1)[0].id

        messages.append(
            {'user_id': user_id,
            'channel_id': channel_id,
            'message': f'<p class="chat__text">{fake.sentence(nb_words=random.randint(1,15))}</p>'}
        )

    for message in messages:
        load_channel_message = ChannelMessage(user_id=message['user_id'], channel_id=message['channel_id'], message=message['message'])
        db.session.add(load_channel_message)


    db.session.commit()

# Uses a raw SQL query to TRUNCATE the channel_messages table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_channel_messages():
    db.session.execute('TRUNCATE channel_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
