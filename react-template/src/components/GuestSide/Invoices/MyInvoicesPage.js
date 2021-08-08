import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { getUserInvoices } from "../../../store/invoice-store";
import PayInvoiceModal from "./PayInvoiceModal";
import "../guestSide.css"

const MyInvoices = () => {

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
                                <p>$$$$$${invoice?.ranch_name}</p>
                                <p>${invoice?.amount_due} <br />
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
