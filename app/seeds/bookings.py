from app.models import db, Booking
from datetime import date

def seed_bookings():

    book1 = Booking(ranch_id='6',
                guest_id='1',
                cabin_id='15',
                interests=None,
                start_date=date(2020,6,28),
                end_date=date(2020,7,4),
                guest_count='1',
                total='2850')
    book2 = Booking(ranch_id='9',
                guest_id='1',
                cabin_id='21',
                interests=None,
                start_date=date(2021,7,11),
                end_date=date(2021,7,17),
                guest_count='1',
                total='2760')
    book3 = Booking(ranch_id='4',
                guest_id='1',
                cabin_id='10',
                interests=None,
                start_date=date(2021,7,18),
                end_date=date(2021,7,24),
                guest_count='1',
                total='2796')

    book4 = Booking(ranch_id='4',
                guest_id='4',
                cabin_id='9',
                interests=None,
                start_date=date(2020,7,11),
                end_date=date(2020,7,17),
                guest_count='3',
                total='8388')
    book5 = Booking(ranch_id='4',
                guest_id='4',
                cabin_id='10',
                interests=None,
                start_date=date(2021,8,11),
                end_date=date(2021,8,17),
                guest_count='3',
                total='8388')

    book6 = Booking(ranch_id='5',
                guest_id='2',
                cabin_id='13',
                interests=None,
                start_date=date(2021,8,18),
                end_date=date(2021,8,24),
                guest_count='2',
                total='4980')

    book7 = Booking(ranch_id='6',
                guest_id='1',
                cabin_id='14',
                interests=None,
                start_date=date(2020,7,11),
                end_date=date(2020,7,17),
                guest_count='1',
                total='2850')


    book8 = Booking(ranch_id='9',
                guest_id='2',
                cabin_id='23',
                interests=None,
                start_date=date(2020,8,11),
                end_date=date(2020,8,17),
                guest_count='2',
                total='5520')

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
    db.session.execute('TRUNCATE bookings RESTART IDENTITY CASCADE;')
    db.session.commit()
