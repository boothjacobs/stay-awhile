from app.models import ranch
from .db import db

class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key = True)
    ranch_id = db.Column(db.Integer, db.ForeignKey('ranches.id'))
    guest_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    cabin_id = db.Column(db.Integer, db.ForeignKey('cabins.id'))
    interests = db.Column(db.String)
    start_date = db.Column(db.Date, nullable = False)
    end_date = db.Column(db.Date, nullable = False)
    guest_count = db.Column(db.Integer, nullable = False)
    total = db.Column(db.Integer, nullable = False)
    ranch = db.relationship("Ranch", back_populates="bookings")
    guest = db.relationship("User", back_populates="bookings")
    cabin = db.relationship("Cabin", back_populates="bookings")
    invoice = db.relationship("Invoice", back_populates="booking")
    review = db.relationship("Review", back_populates="booking")


    def to_dict(self):
        return {
            "id": self.id,
            "ranch": self.ranch.ranch_name,
            "ranch_id": self.ranch.id,
            "guest": self.guest.full_name,
            "guest_id": self.guest_id,
            "cabin": self.cabin.name,
            "cabin_id": self.cabin.id,
            "interests": self.interests,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "guest_count": self.guest_count,
            "total": self.total,
            "reviews": [rev.to_dict() for rev in self.review],
            "invoice": [inv.to_dict() for inv in self.invoice]
        }
