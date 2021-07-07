from flask import Blueprint
from flask_login import login_required
from sqlalchemy import desc
from app.models import db, User, Booking, Invoice, Review

user_routes = Blueprint('users', __name__)


@user_routes.route("/<id>/bookings", methods=["GET"])
@login_required
def get_bookings(id):
    # trying to return in chronological order (getting busted by dictionary?)
    bookings = Booking.query.filter(Booking.guest_id == id).order_by(desc(Booking.start_date)).all()
    return {booking.id: booking.to_dict() for booking in bookings}


@user_routes.route("/<id>/invoices", methods=["GET"])
@login_required
def get_invoices(id):
    invoices = Invoice.query.filter(Invoice.guest_id == id).all()
    return {invoice.id: invoice.to_dict() for invoice in invoices}


# @user_routes.route("/<id>/invoices/<invId>", methods=["POST"])
# @login_required
# def pay_invoice(id, invId):
#     pass
#     # request = OrdersCreateRequest()
#     # request.headers['prefer'] = 'return=representation'


@user_routes.route("/<id>/reviews", methods=["GET"])
@login_required
def get_reviews(id):
    reviews = Review.query.filter(Review.guest_id == id).all()
    return {review.id: review.to_dict() for review in reviews}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
