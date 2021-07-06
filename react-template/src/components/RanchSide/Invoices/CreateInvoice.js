import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';

import { getOneBooking } from "../../../store/booking-store";
import { getInvoice, newInvoice } from "../../../store/invoice-store";

const CreateInvoice = () => {
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getOneBooking(id));
        dispatch(getInvoice(id));
    }, [dispatch]);

    const booking = useSelector(state => state.booking);
    // console.log(booking)
    const invoice = useSelector(state => state.invoice);

    const [additional_charges, setAddCharges] = useState(0);
    const [deposit, setDepos] = useState(false);
    const [rollover, setRollover] = useState(false);
    const [amount_paid, setAmtPaid] = useState(0);

    const amountDue = (prevTotal, charges, amountPaid) => {
        return Number(prevTotal) + Number(charges) - Number(amountPaid);
    };

    const updateDeposit = (e) => {
        setDepos(e.target.value);
        if (deposit === true) {
            setAmtPaid(booking.total / 4);
        } else {
            setAmtPaid(0)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("guest_id", booking.guest_id);
        formData.append("additional_charges", additional_charges);
        formData.append("deposit", deposit);
        formData.append("rollover_payment", rollover);
        formData.append("amount_paid", amount_paid);
        formData.append("amount_due", amountDue(booking.total, additional_charges, amount_paid))
        dispatch(newInvoice(id, formData));
    };

    return (
        <div className="under-nav">
            <div id="booking-overview">
                <h2>Booking Details </h2>
                <p>{booking?.guest}</p>
                <p>{booking?.cabin}</p>
                <p>{booking?.start_date}</p>
                <p>{booking?.end_date}</p>
                <p>Guests: {booking?.guest_count}</p>
                <p>Interests: {booking?.interests}</p>
            </div>
            {/* IF INVOICE EXISTS, RENDER EXISITNG INVOICE WITH EDIT BUTTON INSTEAD OF CREATE FORM */}
            {invoice ? (
                <div id="existing-invoice-render">
                    <h4>Invoice Details</h4>
                    <p>Any additional charges: {invoice?.additional_charges}</p>
                    <div className="invoice-boolean">
                        <p>Deposit: {invoice?.deposit ? (<p>Paid</p>) : (<p>Unpaid</p>)}</p>
                    </div>
                    <div className="invoice-boolean">
                        <p>Rollover Payment: {invoice?.rollover_payment ? (<p>Applied</p>) : (<p>None</p>)}</p>
                    </div>
                    <p>Subtotal: {invoice?.total}</p>
                    <p>Amount Paid: {invoice?.amount_paid}</p>
                    <p>Amount Due: {invoice?.amount_due}</p>
                </div>
            ) : (
                <div id="create-invoice-render">
                    <form id="create-invoice-form" onSubmit={handleSubmit}>
                        <label>Total from Booking: ${booking?.total}</label> {/* read only */}
                        <label>Additional charges:
                            <input type="number"
                            value={additional_charges}
                            onChange={(e) => setAddCharges(e.target.value)}/>
                        </label>
                        <label>Deposit: {booking.total / 4}</label> {/* read only: total/4 */}
                        <label>Deposit Paid?
                            <input type="checkbox"
                            value={deposit}
                            onChange={updateDeposit}/>
                        </label>
                        <label>Rollover Payment:
                            <input type="checkbox"
                            value={rollover}
                            onChange={(e) => setRollover(e.target.value)}/>
                        </label>
                        <label>Amount Paid:
                            <input type="number"
                            value={amount_paid}
                            onChange={(e) => setAmtPaid(e.target.value)}/>
                        </label>
                        <p>Amount Due: ${amountDue(booking.total, additional_charges, amount_paid)}</p>
                        <button type="submit">Create New Invoice</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default CreateInvoice;
