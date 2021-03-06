from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    full_name = db.Column(db.String(100), nullable = False)
    email = db.Column(db.String(255), nullable = False, unique = True)
    hashed_password = db.Column(db.String(255), nullable = False)
    age = db.Column(db.Integer)
    phone_number = db.Column(db.String(15))
    dietary_restrictions = db.Column(db.String(100))
    emergency_contact = db.Column(db.String(255))
    staff = db.Column(db.Boolean, nullable = False, default = False)
    ranch_id = db.Column(db.Integer, db.ForeignKey('ranches.id'))
    ranch = db.relationship("Ranch", back_populates="users")
    invoices = db.relationship("Invoice", back_populates="guest")
    bookings = db.relationship("Booking", back_populates="guest")
    reviews = db.relationship("Review", back_populates="guest")


    @property
    def password(self):
        return self.hashed_password

#hashing happens here so seed data doesn't need to be hashed versions
    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password, password)


    def to_dict(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            "age": self.age,
            "phone_number": self.phone_number,
            "dietary_restrictions": self.dietary_restrictions,
            "emergency_contact": self.emergency_contact,
            "staff": self.staff,
            "ranch_id": self.ranch_id,
            "bookings": {booking.id: booking.to_dict() for booking in self.bookings},
            "invoices": {invoice.id: invoice.to_dict() for invoice in self.invoices},
            "reviews": {review.id: review.to_dict() for review in self.reviews}
        }


    # def to_staff_dict(self):
    #     return {
    #         "id": self.id,
    #         "full_name": self.full_name,
    #         "email": self.email,
    #         "age": self.age,
    #         "phone_number": self.phone_number,
    #         "dietary_restrictions": self.dietary_restrictions,
    #         "emergency_contact": self.emergency_contact,
    #         "staff": self.staff,
    #         "ranch_id": self.ranch_id,
    #         "ranch": self.ranch.to_dict(),
    #         "bookings": {booking.id: booking.to_dict() for booking in self.bookings},
    #         "invoices": {invoice.id: invoice.to_dict() for invoice in self.invoices},
    #         "reviews": {review.id: review.to_dict() for review in self.reviews}
    #     }
