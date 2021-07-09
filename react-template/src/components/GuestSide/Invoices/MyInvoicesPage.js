import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';

import { getBookings } from "../../../store/booking-store";
import { getInvoice, getUserInvoices } from "../../../store/invoice-store";

import "../guestSide.css"

const MyInvoices = () => {

    // boilerplate PayPal button code from https://developer.paypal.com/demo/checkout/#/pattern/server
    // const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getUserInvoices(user.id));
    }, [dispatch]);

    const invoices = Object.values(useSelector(state => state.invoice));
    console.log(invoices)

    // // PAYPAL BOILERPLATE: Render the PayPal button into #paypal-button-container */
    // createOrder(data, actions) {
    //     return actions.order.create({
    //       purchase_units: [
    //         {
    //           amount: {
    //             value: "0.01",
    //           },
    //         },
    //       ],
    //     });
    // };

    // onApprove(data, actions) {
    //     return actions.order.capture();
    // };

    return (
        <div className="under-nav">
            <h1>My Invoices</h1>
            <div className="invoice-list">
                {invoices.map((invoice) => {
                    if (invoice?.amount_due > 0) {
                        return (
                        <div className="under-nav">
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
                            </div>
                        </div>
                    )
                    };
                })}
            </div>
        </div>

    )
}

export default MyInvoices;
