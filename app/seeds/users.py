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

    demo5 = User(full_name='Annie Oakley',
                email='annie@aa.io',
                password='password',
                age='31',
                phone_number='18005555555',
                dietary_restrictions='None',
                emergency_contact=None,
                staff=True,
                ranch_id='1')

    demo6 = User(full_name='Calamity Jane',
                email='jane@aa.io',
                password='password',
                age='22',
                phone_number='18005555555',
                dietary_restrictions='None',
                emergency_contact=None,
                staff=True,
                ranch_id='2')

    demo7 = User(full_name='Phoebe Ann Mosey',
                email='pheebs@aa.io',
                password='password',
                age='28',
                phone_number='18005555555',
                dietary_restrictions='None',
                emergency_contact=None,
                staff=True,
                ranch_id='3')

    demo8 = User(full_name='Lillian Smith',
                email='lilz@aa.io',
                password='password',
                age='26',
                phone_number='18005555555',
                dietary_restrictions='None',
                emergency_contact=None,
                staff=True,
                ranch_id='5')

    demo9 = User(full_name='Emmylou Harris',
                email='emmy@aa.io',
                password='password',
                age='39',
                phone_number='18005555555',
                dietary_restrictions='None',
                emergency_contact=None,
                staff=True,
                ranch_id='6')

    demo10 = User(full_name='Lucinda Williams',
                email='lucy@aa.io',
                password='password',
                age='50',
                phone_number='18005555555',
                dietary_restrictions='None',
                emergency_contact=None,
                staff=True,
                ranch_id='7')

    demo11 = User(full_name='Hank Williams',
                email='hank@aa.io',
                password='password',
                age='42',
                phone_number='18005555555',
                dietary_restrictions='None',
                emergency_contact=None,
                staff=True,
                ranch_id='8')

    demo12 = User(full_name='Ned Buntline',
                email='ned@aa.io',
                password='password',
                age='67',
                phone_number='18005555555',
                dietary_restrictions='None',
                emergency_contact=None,
                staff=True,
                ranch_id='9')

    demo13 = User(full_name='John Wayne',
                email='john@aa.io',
                password='password',
                age='68',
                phone_number='18005555555',
                dietary_restrictions='Vegan',
                emergency_contact=None,
                staff=False,
                ranch_id=None)

    demo14 = User(full_name='Natalie Wood',
                email='nat@aa.io',
                password='password',
                age='36',
                phone_number='18005555555',
                dietary_restrictions='None',
                emergency_contact=None,
                staff=False,
                ranch_id=None)

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)
    db.session.add(demo11)
    db.session.add(demo12)
    db.session.add(demo13)
    db.session.add(demo14)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# TRUNCATE Removes all the data from the table, and restart identity resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
