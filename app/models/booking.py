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


    def to_dict(self):
        return {
            "id": self.id,
            "ranch": self.ranches.name,
            "guest": self.guests.full_name,
            "cabin": self.cabins.name,
            "interests": self.interests,
            "start_date": self.start_date,
            "end_date": self.end_date
        }
