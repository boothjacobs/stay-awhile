from app.models import db, Booking
from datetime import date

def seed_bookings():

    book1 = Booking(ranch_id='6',
                    guest_id='1',
                    cabin_id='15',
                    interests=None,
                    start_date=date(2021,6,28))

def undo_bookings():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

# ranch_id = db.Column(db.Integer, db.ForeignKey('ranches.id'))
#     guest_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     cabin_id = db.Column(db.Integer, db.ForeignKey('cabins.id'))
#     interests = db.Column(db.String)
#     start_date = db.Column(db.Date, nullable = False)
#     end_date
