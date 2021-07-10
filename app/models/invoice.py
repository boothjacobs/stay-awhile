from .db import db

class Invoice(db.Model):
    __tablename__ = "invoices"

    id = db.Column(db.Integer, primary_key = True)
    guest_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'))
    ranch_id = db.Column(db.Integer, db.ForeignKey('ranches.id'))
    additional_charges = db.Column(db.Integer)
    deposit = db.Column(db.Boolean, nullable = False)
    rollover_payment = db.Column(db.Boolean)
    amount_paid = db.Column(db.Integer)
    amount_due = db.Column(db.Integer)
    guest = db.relationship("User", back_populates="invoices")
    booking = db.relationship("Booking", back_populates="invoice")
    ranch = db.relationship("Ranch", back_populates="invoices")


    def to_dict(self):
        return {
            "id": self.id,
            "guest": self.guest.full_name,
            "additional_charges": self.additional_charges,
            "deposit": self.deposit,
            "rollover_payment": self.rollover_payment,
            "amount_paid": self.amount_paid,
            "amount_due": self.amount_due,
            "total": self.booking.total
        }
