from .db import db

class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key = True)
    guest_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    ranch_id = db.Column(db.Integer, db.ForeignKey('ranches.id'))
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'))
    content = db.Column(db.String(1000))
    stars = db.Column(db.Integer)
    guest = db.relationship("User", back_populates="reviews")
    ranch = db.relationship("Ranch", back_populates="reviews")
    booking = db.relationship("Booking", back_populates="review")

    def to_dict(self):
        return {
            "id": self.id,
            "guest": self.guest.full_name,
            "ranch_id": self.ranch_id,
            "booking_id": self.booking_id,
            "content": self.content,
            "stars": self.stars
        }
