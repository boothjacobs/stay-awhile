from .db import db

class Ranch(db.Model):
    __tablename__ = 'ranches'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    location = db.Column(db.String(100), nullable = False)
    nightly_rate = db.Column(db.Integer)


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "rate": self.nightly_rate
        }
