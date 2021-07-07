import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';

import { getBookings } from "../../../store/booking-store";
import { getInvoice, getUserInvoices } from "../../../store/invoice-store";

import "../guestSide.css"

const MyInvoices = () => {

    // boilerplate PayPal button code from https://developer.paypal.com/demo/checkout/#/pattern/server

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getUserInvoices(user.id));
    }, [dispatch]);

    const invoices = Object.values(useSelector(state => state.invoice));
    console.log(invoices)

    // PAYPAL BOILERPLATE: Render the PayPal button into #paypal-button-container */
    paypal.Buttons({
       // Call your server to set up the transaction
        createOrder: function(data, actions) {
            return fetch('/demo/checkout/api/paypal/order/create/', {
                method: 'post'
            }).then(function(res) {
                return res.json();
            }).then(function(orderData) {
                return orderData.id;
            });
        },

        // Call your server to finalize the transaction
        onApprove: function(data, actions) {
            return fetch('/demo/checkout/api/paypal/order/' + data.orderID + '/capture/', {
                method: 'post'
            }).then(function(res) {
                return res.json();
            }).then(function(orderData) {
                // Three cases to handle:
                //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                //   (2) Other non-recoverable errors -> Show a failure message
                //   (3) Successful transaction -> Show confirmation or thank you

                // This example reads a v2/checkout/orders capture response, propagated from the server
                // You could use a different API or structure for your 'orderData'
                var errorDetail = Array.isArray(orderData.details) && orderData.details[0];

                if (errorDetail && errorDetail.issue === 'INSTRUMENT_DECLINED') {
                    return actions.restart(); // Recoverable state, per:
                    // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
                }

                if (errorDetail) {
                    var msg = 'Sorry, your transaction could not be processed.';
                    if (errorDetail.description) msg += '\n\n' + errorDetail.description;
                    if (orderData.debug_id) msg += ' (' + orderData.debug_id + ')';
                    return alert(msg); // Show a failure message
                }

                // Show a success message
                alert('Transaction completed by ' + orderData.payer.name.given_name);
            });
        }

    }).render('#paypal-button-container');

    return (
        <div className="under-nav">
            <h1>My Invoices</h1>
            <div className="invoice-list">
                {invoices.map((invoice) => {
                    return (
                        <div className="under-nav">
                            <script src="https://www.paypal.com/sdk/js?client-id=test"></script>
                            <script>paypal.Buttons().render('body');</script>
                            <div id="existing-invoice-render">
                                <h4>Invoice Details</h4>
                                <p>Any additional charges: {invoice?.additional_charges}</p>
                                <div className="invoice-boolean">
                                    Deposit: {invoice?.deposit ? (<p>Paid</p>) : (<p>Unpaid</p>)}
                                </div>
                                <div className="invoice-boolean">
                                    Rollover Payment: {invoice?.rollover_payment ? (<p>Applied</p>) : (<p>None</p>)}
                                </div>
                                <p>Subtotal: {invoice?.total}</p>
                                <p>Amount Paid: {invoice?.amount_paid}</p>
                                <p>Amount Due: {invoice?.amount_due}</p>

                                {/* PAYPAL BOILERPLATE: Set up a container element for the button --> */}
                                <div id="paypal-button-container"></div>
                                {/* <!-- Include the PayPal JavaScript SDK --> */}
                                <script src="https://www.paypal.com/sdk/js?client-id=test&currency=USD"></script>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default MyInvoices;
