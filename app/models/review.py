from .db import db

class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key = True)
    guest_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    ranch_id = db.Column(db.Integer, db.ForeignKey('ranches.id'))
    content = db.Column(db.String(1000))
    stars = db.Column(db.Integer)
    guest = db.relationship("User", back_populates="reviews")
    ranch = db.relationship("Ranch", back_populates="reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "guest": self.guest.full_name,
            "ranch_id": self.ranch_id,
            "content": self.content,
            "stars": self.stars
        }
