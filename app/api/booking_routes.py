from flask import Blueprint, request
from app.models import db, Review, Invoice, User, Booking
from flask_login import current_user, login_required

booking_routes = Blueprint('booking', __name__)


@booking_routes.route("/<id>", methods=["GET"])
@login_required
def get_one_booking(id):
    booking = Booking.query.get(id)
    return booking.to_dict()


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


@booking_routes.route("/<id>/invoice", methods=["GET"])
@login_required
def get_invoice(id):
    invoice = Invoice.query.filter(Invoice.booking_id == id).first()
    if invoice:
        return invoice.to_dict()
    else:
        return {0: ""}


@booking_routes.route("/<id>/invoice", methods=["POST"])
@login_required
def new_invoice(id):
    if request.form["deposit"] == "false":
        deposit = False
    else:
        deposit = True
    if request.form["rollover_payment"] == "false":
        rollover_payment = False
    else:
        rollover_payment = True
    invoice = Invoice(
        guest_id=request.form["guest_id"],
        booking_id=id,
        additional_charges=request.form["additional_charges"],
        deposit=deposit,
        rollover_payment=rollover_payment,
        amount_paid=request.form["amount_paid"],
        amount_due=request.form["amount_due"]
    )
    db.session.add(invoice)
    db.session.commit()
    return invoice.to_dict()


@booking_routes.route("/<bookId>/invoice/<id>", methods=["PUT"])
@login_required
def edit_invoice(bookId, id):
    invoice = Invoice.query.get(id)

    if request.form["deposit"] == "false":
        invoice.deposit = False
    else:
        invoice.deposit = True

    if request.form["rollover_payment"] == "false":
        invoice.rollover_payment = False
    else:
        invoice.rollover_payment = True

    invoice.additional_charges = request.form["additional_charges"],
    invoice.amount_paid = request.form["amount_paid"],
    invoice.amount_due = request.form["amount_due"]

    db.session.add(invoice)
    db.session.commit()

    return invoice.to_dict()


@booking_routes.route("/<bookId>/invoice/<id>", methods=["DELETE"])
@login_required
def delete_invoice(bookId, id):
    invoice = Invoice.query.get(id)
    db.session.delete(invoice)
    db.session.commit()
    return {"deleted": id}


@booking_routes.route("/<bookId>/review", methods=["POST"])
@login_required
def new_review(bookId):
    review = Review(
        ranch_id=request.form["ranch_id"],
        guest_id=request.form["guest_id"],
        booking_id=bookId,
        content=request.form["content"],
        stars=request.form["stars"]
    )
    db.session.add(review)
    db.session.commit()
    return review.to_dict()


@booking_routes.route("/<bookId>/review/<id>", methods=["PUT"])
@login_required
def edit_review(bookId, id):
    review = Review.query.get(id)
    review.content = request.form["content"]
    review.stars = request.form["stars"]

    db.session.add(review)
    db.session.commit()

    return review.to_dict()


@booking_routes.route("/<bookId>/review/<id>", methods=["DELETE"])
@login_required
def delete_review(bookId, id):
    review = Review.query.get(id)

    db.session.delete(review)
    db.session.commit()
    return {"deleted": id}
