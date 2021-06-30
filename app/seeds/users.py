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
                staff=False,
                ranch_id=None)

    demo2 = User(full_name='Frank Azaria',
                email='frank@aa.io',
                password='password',
                age='45',
                phone_number='18005555555',
                dietary_restrictions='Vegan',
                emergency_contact=None,
                staff=False,
                ranch_id=None)

    demo3 = User(full_name='Han Solo',
                email='solo@aa.io',
                password='password',
                age='26',
                phone_number='18005555555',
                dietary_restrictions='None',
                emergency_contact=None,
                staff=True,
                ranch_id='4')

    demo4 = User(full_name='Bebe Neuwirth',
                email='beebs@aa.io',
                password='password',
                age='56',
                phone_number='18005555555',
                dietary_restrictions='None',
                emergency_contact=None,
                staff=False,
                ranch_id=None)


    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# TRUNCATE Removes all the data from the table, and restart identity resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
