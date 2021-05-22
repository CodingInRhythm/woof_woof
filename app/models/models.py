#################### IMPORTS ####################
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

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

# # CHANNEL MESSAGE JOIN TABLE #
# class ChannelMessage(db.Model):
#   __tablename__ = 'channel_messages'

#   id = db.Column(db.Integer, primary_key = True)
#   user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, primary_key=True)
#   channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False, primary_key=True)
#   message = db.Column(db.Text, nullable = False)


# # DIRECT MESSAGE JOIN TABLE #
# class DirectMessage(db.Model):
#   __tablename__ = 'direct_messages'

#   id = db.Column(db.Integer, primary_key = True)
#   sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, primary_key=True)
#   recipient_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, primary_key=True)
#   message = db.Column(db.Text, nullable = False)


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

  channel_owned = db.relationship(
    "Channel",
    back_populates="owner",
    cascade='all, delete-orphan'
  )

  channels_in = db.relationship(
    "Channel",
    secondary=channel_users,
    back_populates="users_in"
  )

  # channel_messages = db.relationship(
  #   "Channel",
  #   secondary=ChannelMessage,
  #   back_populates="user_messages"
  # )

  # direct_messages = db.relationship(
  #   "User",
  #   secondary=DirectMessage,
  #   back_populates="user_messages"
  # )

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email
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
    back_populates="channel_owned"
  )

  users_in = db.relationship(
    "User",
    secondary=channel_users,
    back_populates="channels"
  )

  # user_messages = db.relationship(
  #   "User",
  #   secondary=ChannelMessage,
  #   back_populates="channel_messages"
  # )
