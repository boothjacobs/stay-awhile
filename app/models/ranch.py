from .db import db

class Ranch(db.Model):
    __tablename__ = 'ranches'

    id = db.Column(db.Integer, primary_key = True)
    ranch_name = db.Column(db.String(100), nullable = False)
    location = db.Column(db.String(100), nullable = False)
    description = db.Column(db.String(255))
    nightly_rate = db.Column(db.Integer)


    def to_dict(self):
        return {
            "id": self.id,
            "ranch_name": self.ranch_name,
            "location": self.location,
            "description": self.description,
            "rate": self.nightly_rate
        }
