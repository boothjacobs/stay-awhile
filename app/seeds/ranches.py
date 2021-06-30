from app.models import db, Ranch

def seed_ranches():

    ranch_one = Ranch(name='7D Ranch',
                    location='Cody, Wyoming',
                    nightly_rate='398')

    ranch_two = Ranch(name='Lazy L and B Ranch',
                    location='Dubois, Wyoming',
                    nightly_rate='400')

    ranch_3 = Ranch(name='The Hideout',
                    location='Shell, Wyoming',
                    nightly_rate='595')

    ranch_4 = Ranch(name='VeeBar Guest Ranch',
                    location='Laramie, Wyoming',
                    nightly_rate='466')

    ranch_5 = Ranch(name='Crossed Sabres Ranch',
                    location='Cody, Wyoming',
                    nightly_rate='415')

    ranch_6 = Ranch(name='R Lazy S Ranch',
                    location='Teton Village, Wyoming',
                    nightly_rate='475')

    ranch_7 = Ranch(name='Diamond 4 Ranch',
                    location='Lander, Wyoming',
                    nightly_rate='345')

    ranch_8 = Ranch(name='Absaroka Ranch',
                    location='Dubois, Wyoming',
                    nightly_rate='365')

    ranch_9 = Ranch(name='Moose Head Ranch',
                    location='Jackson Hole, Wyoming',
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
