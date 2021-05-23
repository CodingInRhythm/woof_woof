#################### IMPORTS ####################
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .channels import seed_channels, undo_channels
from .channel_messages import seed_channel_messages, undo_channel_messages


#################### SETUP ####################
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


#################### COMMANDS ####################
# Creates the `flask seed ua` command meant to run all commands in one command
@seed_commands.command('test')
def test():
    seed_channel_messages()

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_channels()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_channels()
    # Add other undo functions here

# Creates the `flask seed run` command meant to run all commands in one command
@seed_commands.command('run')
def ua():
    undo_users()
    seed_users()
    undo_channels()
    seed_channels()
    # Add other undo functions here

# # Creates the `flask seed ua` command meant to run all commands in one command
# @seed_commands.command('test')
# def test():
#     seed_channel_messages()