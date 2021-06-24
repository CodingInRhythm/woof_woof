#################### IMPORTS ####################
from flask import session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

#################### SETUP ####################
db = SQLAlchemy()


#################### MODELS ####################

# CHANNEL USER JOIN TABLE #
channel_users = db.Table(
    "channel_users",
    db.Column(
        "user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True
    ),
    db.Column(
        "channel_id", db.Integer, db.ForeignKey("channels.id"), primary_key=True
    )
)

# CHANNEL MESSAGE JOIN TABLE #
class ChannelMessage(db.Model):
  __tablename__ = 'channel_messages'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False)
  message = db.Column(db.Text, nullable = False)
  created_at=db.Column(db.DateTime(timezone=True), default=datetime.now())

  user = db.relationship(
    "User",
    back_populates="channel_messages"
  )

  channel = db.relationship(
    "Channel",
    back_populates="user_messages"
  )


  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "channel_id": self.channel_id,
      "message": self.message,
      "created_at": str(self.created_at),
      "user": self.user.to_dict_basic(),
      "channel": self.channel.to_dict_basic(),
    }

  def to_dict_basic(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "channel_id": self.channel_id,
      "message": self.message,
    }

# DIRECT MESSAGE JOIN TABLE #
class DirectMessage(db.Model):
  __tablename__ = 'direct_messages'

  id = db.Column(db.Integer, primary_key = True)
  sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  recipient_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  message = db.Column(db.Text, nullable = False)
  created_at=db.Column(db.DateTime(timezone=True), default=datetime.now())

  user = db.relationship(
    "User",
    back_populates="sender_messages",
    foreign_keys=[sender_id]
  )

  recipient = db.relationship(
    "User",
    back_populates="recipient_messages",
    foreign_keys=[recipient_id]
  )

  def to_dict(self):
    return {
      "id": self.id,
      "sender_id": self.sender_id,
      "recipient_id": self.recipient_id,
      "message": self.message,
      "created_at": str(self.created_at),
      "user": self.user.to_dict_basic(),
      "recipient": self.recipient.to_dict_basic(),
    }

  def to_dict_basic(self):
    return {
      "id": self.id,
      "sender_id": self.sender_id,
      "recipient_id": self.recipient_id,
      "message": self.message,
      "created_at": str(self.created_at),
    }


# USER TABLE #
class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  firstname = db.Column(db.String(40))
  lastname = db.Column(db.String(40))
  online_status = db.Column(db.Boolean, nullable = False, default=False)
  profile_photo = db.Column(db.String(255))

  channels_owned = db.relationship(
    "Channel",
    back_populates="owner",
    cascade='all, delete-orphan'
  )

  channels_in = db.relationship(
    "Channel",
    secondary=channel_users,
    back_populates="users_in"
  )

  channel_messages = db.relationship(
    "ChannelMessage",
    back_populates="user"
  )

  sender_messages = db.relationship(
    "DirectMessage",
    back_populates="user",
    foreign_keys='DirectMessage.sender_id'
  )

  recipient_messages = db.relationship(
    "DirectMessage",
    back_populates="recipient",
    foreign_keys='DirectMessage.recipient_id'
  )

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)

  def lastSenderMessage(self, messages):
    correct_messages=[message for message in messages if message.recipient_id==int(session['_user_id'])]
    if correct_messages:
      return [correct_messages[-1].to_dict()]
    else:
      return []

  def lastRecipientMessage(self, messages):
    correct_messages=[message for message in messages if message.sender_id==int(session['_user_id'])]
    if correct_messages:
      return [correct_messages[-1].to_dict()]
    else:
      return []



  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      'firstname' : self.firstname,
      'lastname' : self.lastname,
      'online_status' : self.online_status,
      'profile_photo' : self.profile_photo,
      'channels_owned' : [channel.to_dict_basic() for channel in self.channels_owned],
      'channels_in' : [channel.to_dict_basic() for channel in self.channels_in],
      'sender_messages' : self.lastSenderMessage(self.sender_messages),
      'recipient_messages' : self.lastRecipientMessage(self.recipient_messages),
    }

  def to_dict_basic(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      'firstname' : self.firstname,
      'lastname' : self.lastname,
      'online_status' : self.online_status,
      'profile_photo' : self.profile_photo
    }

  def to_dict_search(self, user_id):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      'firstname' : self.firstname,
      'lastname' : self.lastname,
      'online_status' : self.online_status,
      'profile_photo' : self.profile_photo,
      'sender_messages' : [message.to_dict_basic() for message in self.sender_messages if message.recipient_id==int(user_id)],
      'recipient_messages' : [message.to_dict_basic() for message in self.recipient_messages if message.sender_id==int(user_id)]
    }


# CHANNEL TABLE #
class Channel(db.Model):
  __tablename__ = 'channels'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  name = db.Column(db.String(40), nullable = False)
  is_channel = db.Column(db.Boolean, nullable = False)

  owner = db.relationship(
    "User",
    back_populates="channels_owned"
  )

  users_in = db.relationship(
    "User",
    secondary=channel_users,
    back_populates="channels_in"
  )

  user_messages = db.relationship(
    "ChannelMessage",
    back_populates="channel"
  )


  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "name": self.name,
      "is_channel": self.is_channel,
      'owner' : self.owner.to_dict_basic(),
      'users_in' : [user.to_dict_basic() for user in self.users_in],
    }


  def to_dict_basic(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "name": self.name,
      "is_channel": self.is_channel,
    }