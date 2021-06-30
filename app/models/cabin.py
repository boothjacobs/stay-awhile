from .db import db

class Cabin(db.Model):
    __tablename__ = 'cabins'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    beds = db.Column(db.Integer, nullable = False)
    total_capacity = db.Column(db.Integer, nullable = False)
    img_url = db.Column(db.String)
    ranch_id = db.Column(db.Integer, db.ForeignKey('ranches.id'))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "beds": self.beds,
            "total_capacity": self.total_capacity,
            "img_url": self.img_url,
            "ranch": self.ranches.name
        }