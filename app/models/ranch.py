from .db import db

class Ranch(db.Model):
    __tablename__ = 'ranches'

    id = db.Column(db.Integer, primary_key = True)
    ranch_name = db.Column(db.String(100), nullable = False)
    location = db.Column(db.String(100), nullable = False)
    description = db.Column(db.String(255))
    nightly_rate = db.Column(db.Integer)
    #ADD IMAGE URL
    users = db.relationship("User", back_populates="ranch")
    cabins = db.relationship("Cabin", back_populates="ranch")
    bookings = db.relationship("Booking", back_populates="ranch")


    def to_dict(self):
        return {
            "id": self.id,
            "ranch_name": self.ranch_name,
            "location": self.location,
            "description": self.description,
            "rate": self.nightly_rate,
            "cabins": {cabin.id: cabin.to_dict() for cabin in self.cabins},
            "bookings": {booking.id: booking.to_dict() for booking in self.bookings}
        }
