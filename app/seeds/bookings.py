from app.models import db, Booking
from datetime import date

def seed_bookings():

    book1 = Booking(ranch_id='6',
                    guest_id='1',
                    cabin_id='15',
                    interests=None,
                    start_date=date(2020,6,28),
                    end_date=date(2020,7,4))
    book2 = Booking(ranch_id='9',
                guest_id='1',
                cabin_id='21',
                interests=None,
                start_date=date(2021,7,11),
                end_date=date(2021,7,17))
    book3 = Booking(ranch_id='4',
                guest_id='1',
                cabin_id='10',
                interests=None,
                start_date=date(2021,7,18),
                end_date=date(2021,7,24))

    book4 = Booking(ranch_id='4',
                guest_id='4',
                cabin_id='9',
                interests=None,
                start_date=date(2020,7,11),
                end_date=date(2020,7,17))

    book5 = Booking(ranch_id='4',
                guest_id='4',
                cabin_id='10',
                interests=None,
                start_date=date(2021,7,11),
                end_date=date(2021,7,17))

    book6 = Booking(ranch_id='5',
                guest_id='2',
                cabin_id='13',
                interests=None,
                start_date=date(2021,8,18),
                end_date=date(2021,8,24))

    book7 = Booking(ranch_id='6',
                guest_id='1',
                cabin_id='14',
                interests=None,
                start_date=date(2020,7,11),
                end_date=date(2020,7,17))


    book8 = Booking(ranch_id='9',
                guest_id='2',
                cabin_id='23',
                interests=None,
                start_date=date(2020,8,11),
                end_date=date(2020,8,17))

    db.session.add(book1)
    db.session.add(book2)
    db.session.add(book3)
    db.session.add(book4)
    db.session.add(book5)
    db.session.add(book6)
    db.session.add(book7)
    db.session.add(book8)
    db.session.commit()

def undo_bookings():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
