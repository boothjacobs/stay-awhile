import os
from flask import Blueprint, redirect, request
import stripe

payment_routes = Blueprint('payment', __name__)

stripe.api_key = os.environ.get("STRIPE_TEST_KEY")

# Payment thunk first makes POST call to api/prices--pass Ranch data and Booking data
# bookingPrice = stripe.Price.create(
#     unit_amount={include from booking object},
#       currency="usd",
#       product_data={"name":"ranch.name"}
# )
    #returns bookingPrice
#Payment thunk then sends bookingPrice in POST call to payment route

YOUR_DOMAIN = 'http://localhost:4242'
@payment_routes.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=[
              'card',
              'sepa_debit', #include SEPA Direct Debit as a payment option
            ],
            line_items=[
                {
                    # pass in total payment value from api/prices call
                    'price': bookingPrice,
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=YOUR_DOMAIN + '/success.html',
            cancel_url=YOUR_DOMAIN + '/cancel.html',
        )
    except Exception as e:
        return str(e)
    return redirect(checkout_session.url, code=303)
