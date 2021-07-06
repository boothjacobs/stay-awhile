from werkzeug.datastructures import ContentRange
from app.models import db, Review

def seed_reviews():

    review1 = Review(
        guest_id='1',
        booking_id='1',
        content="Aenean dictum leo elementum, bibendum neque facilisis, interdum mauris. Praesent efficitur maximus arcu, vel tincidunt purus mattis vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque dictum mauris a nunc venenatis, vel luctus nisi pulvinar.",
        stars='4'
    )

    review2 = Review(
        guest_id='1',
        booking_id='7',
        content="Fusce a erat ullamcorper, rhoncus neque ac, pharetra ante. Integer aliquam finibus metus, sed tempor mi egestas eu.",
        stars='5'
    )

    review3 = Review(
        guest_id='2',
        booking_id='8',
        content="Nullam iaculis ligula ligula, eget finibus urna feugiat a. Phasellus ornare leo quam, eu rhoncus turpis vestibulum at. Etiam lacus leo, fermentum ut congue sed, luctus efficitur dui.",
        stars='3'
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
