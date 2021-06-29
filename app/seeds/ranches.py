from app.models import db, Ranch

def seed_ranches():

    ranch_one = Ranch(name='7D Ranch',
                    nightly_rate='295')

    db.session.add(ranch_one)
    db.session.commit()

def undo_ranches():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
