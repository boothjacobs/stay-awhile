from flask import Blueprint, request
from app.models import db, Ranch, Cabin, User, Booking
from flask_login import current_user, login_required

booking_routes = Blueprint('booking', __name__)


@booking_routes.route("", methods=["POST"])
@login_required
def new_booking():
    booking = Booking(
        ranch_id=request.form["ranch_id"],
        guest_id=request.form["guest_id"],
        cabin_id=request.form["cabin_id"],
        interests=request.form["interests"],
        start_date=request.form["start_date"],
        end_date=request.form["end_date"],
        guest_count=request.form["guest_count"],
        total=request.form["total"]
    )
    db.session.add(booking)
    db.session.commit()
    return booking.to_dict()


@booking_routes.route("/<id>", methods=["PUT"])
@login_required
def edit_booking(id):
    booking = Booking.query.get(id)
    booking.cabin_id = request.form["cabin_id"],
    booking.interests = request.form["interests"],
    booking.start_date = request.form["start_date"],
    booking.end_date = request.form["end_date"],
    booking.guest_count = request.form["guest_count"],
    booking.total = request.form["total"]

    db.session.add(booking)
    db.session.commit()

    return booking.to_dict()


@booking_routes.route("/<id>", methods=["DELETE"])
@login_required
def delete_booking(id):
    booking = Booking.query.get(id)
    db.session.delete(booking)
    db.session.commit()
    return {"deleted": id}
