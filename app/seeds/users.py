from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(full_name='Demo Johnson',
                email='demo@aa.io',
                password='password',
                age='45',
                phone_number='18005555555',
                dietary_restrictions='None',
                emergency_contact=None,
                staff=False)

    db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# TRUNCATE Removes all the data from the table, and restart identity resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
