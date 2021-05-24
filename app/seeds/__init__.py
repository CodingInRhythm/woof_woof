#################### IMPORTS ####################
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .channels import seed_channels, undo_channels
from .channel_messages import seed_channel_messages, undo_channel_messages
from .direct_messages import seed_direct_messages, undo_direct_messages


#################### SETUP ####################
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


#################### COMMANDS ####################
# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_channels()
    seed_channel_messages()
    seed_direct_messages()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_direct_messages()
    undo_channel_messages()
    undo_channels()
    undo_users()
    # Add other undo functions here

# Creates the `flask seed run` command meant to run all commands in one command
@seed_commands.command('run')
def ua():
    # undo_direct_messages()
    undo_channel_messages()
    undo_channels()
    undo_users()
    seed_users()
    seed_channels()
    seed_channel_messages()
    seed_direct_messages()
    # Add other undo functions here
