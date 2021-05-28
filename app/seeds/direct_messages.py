#################### IMPORTS ####################
import random
from faker import Faker

from app.models import db, User, DirectMessage


#################### FUNCTIONS ####################

# Seeds DirectMessage Data
def seed_direct_messages():

    fake = Faker()

    user_count = len(User.query.all())

    messages = [
        {'sender_id': 1, 'recipient_id': 2, "message": '<p class="chat__text">Spicy?</p>'},
        {'sender_id': 2, 'recipient_id': 1, "message": '<p class="chat__text">Spicy</p>'},
    ]

    for _ in range(100):
        sender_id = random.randint(1,user_count)
        recipient_id = random.randint(1,user_count)

        messages.append(
            {'sender_id': sender_id,
            'recipient_id': recipient_id,
            'message': f'<p class="chat__text">{fake.sentence(nb_words=random.randint(1,15))}</p>'}
        )

    for message in messages:
        load_direct_message = DirectMessage(sender_id=message['sender_id'], recipient_id=message['recipient_id'], message=message['message'])
        db.session.add(load_direct_message)


    db.session.commit()

# Uses a raw SQL query to TRUNCATE the direct_messages table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_direct_messages():
    db.session.execute('TRUNCATE direct_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
