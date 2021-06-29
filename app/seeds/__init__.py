from flask.cli import AppGroup #creates CLI commands
from .users import seed_users, undo_users
from .ranches import seed_ranches, undo_ranches

# Creates a seed group to hold our commands
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_ranches()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_ranches()
    # Add other undo functions here
