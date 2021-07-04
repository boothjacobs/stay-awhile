from flask import Blueprint
from flask_login import login_required
from app.models import db, User, Booking

user_routes = Blueprint('users', __name__)


@user_routes.route("/<id>/bookings", methods=["GET"])
@login_required
def get_bookings(id):
    bookings = Booking.query.filter(Booking.guest_id == id).all()
    return {booking.id: booking.to_dict() for booking in bookings}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
