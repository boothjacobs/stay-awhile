from app.models import db, Ranch

def seed_ranches():

    ranch_one = Ranch(ranch_name='7D Ranch',
                    location='Cody, Wyoming',
                    description=None,
                    nightly_rate='398')

    ranch_two = Ranch(ranch_name='Lazy L and B Ranch',
                    location='Dubois, Wyoming',
                    description=None,
                    nightly_rate='400')

    ranch_3 = Ranch(ranch_name='The Hideout',
                    location='Shell, Wyoming',
                    description=None,
                    nightly_rate='595')

    ranch_4 = Ranch(ranch_name='VeeBar Guest Ranch',
                    location='Laramie, Wyoming',
                    description=None,
                    nightly_rate='466')

    ranch_5 = Ranch(ranch_name='Crossed Sabres Ranch',
                    location='Cody, Wyoming',
                    description=None,
                    nightly_rate='415')

    ranch_6 = Ranch(ranch_name='R Lazy S Ranch',
                    location='Teton Village, Wyoming',
                    description=None,
                    nightly_rate='475')

    ranch_7 = Ranch(ranch_name='Diamond 4 Ranch',
                    location='Lander, Wyoming',
                    description=None,
                    nightly_rate='345')

    ranch_8 = Ranch(ranch_name='Absaroka Ranch',
                    location='Dubois, Wyoming',
                    description=None,
                    nightly_rate='365')

    ranch_9 = Ranch(ranch_name='Moose Head Ranch',
                    location='Jackson Hole, Wyoming',
                    description=None,
                    nightly_rate='460')

    db.session.add(ranch_one)
    db.session.add(ranch_two)
    db.session.add(ranch_3)
    db.session.add(ranch_4)
    db.session.add(ranch_5)
    db.session.add(ranch_6)
    db.session.add(ranch_7)
    db.session.add(ranch_8)
    db.session.add(ranch_9)
    db.session.commit()

def undo_ranches():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
