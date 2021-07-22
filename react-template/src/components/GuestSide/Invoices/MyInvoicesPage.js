import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { getUserInvoices } from "../../../store/invoice-store";
import PayInvoiceModal from "./PayInvoiceModal";
import "../guestSide.css"

const MyInvoices = () => {
    // boilerplate PayPal button code from https://developer.paypal.com/demo/checkout/#/pattern/server
    // const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [details, setDetails] = useState(false);

    useEffect(() => {
        dispatch(getUserInvoices(user.id));
    }, [dispatch, user.id]);

    const invoices = Object.values(useSelector(state => state.invoice));

    const showDetails = (e) => {
        if (details) {
            setDetails(false);
        } else {
            setDetails(true);
        }
    };

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
        <div id="my-invoice-background">
        <div id="my-invoice-js">
            <h1>My Invoices</h1>
            <div className="invoice-list">
                {invoices.map((invoice) => {
                    if (invoice?.amount_due > 0) {
                        return (
                            <div className="existing-invoice-render" key={invoice?.id}>
                                <h4>Invoice No. {invoice?.id}</h4>
                                <p>{invoice?.guest} <br />
                                Booking No. {invoice?.booking_id}</p>
                                <PayInvoiceModal invoice={invoice} />
                            </div>
                        )
                    };
                })}
            </div>
                <h2>Paid Invoices</h2>
            <div className="invoice-list">
                {invoices.map((invoice) => {
                    if (invoice?.amount_due === 0) {
                        return (
                            <div className="existing-invoice-render" key={invoice?.id}>
                                <h4>Invoice No. {invoice?.id}</h4>
                                <p>{invoice?.guest} <br />
                                Booking No. {invoice?.booking_id}</p>
                            </div>
                        )
                    };
                })}
            </div>
        </div>
        </div>
    )
}

export default MyInvoices;
