import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from "../../../context/Modal";
import { getUserInvoices } from '../../../store/invoice-store';

const PayInvoiceModal = ({invoice}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        setShowModal(false);
        dispatch(getUserInvoices(user?.id));
    };

    return (
        <>
        <button type="button" onClick={() => setShowModal(true)}>Details</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <div id="pay-invoice-modal-content">
                    <h4>Invoice No. {invoice?.id}</h4>
                    <p>{invoice?.guest} <br />
                    Booking No. {invoice?.booking_id}</p>
                    <div className="invoice-boolean">
                        Deposit: {invoice?.deposit ? (<p>Paid</p>) : (<p className="amount-due">Not Paid</p>)}
                        <br/>Rollover Payment: {invoice?.rollover_payment ? (<p>Applied</p>) : (<p>None</p>)}
                    </div>
                    <p>Any additional charges: {invoice?.additional_charges ? (invoice?.additional_charges) : ("None")}</p>
                    <p>Subtotal: ${invoice?.total}<br/>
                    Amount Paid: ${invoice?.amount_paid}</p>
                    <p className="amount-due">Amount Due: ${invoice?.amount_due}</p>
                    <button type="button">Make Payment</button>
                </div>
            </Modal>
        )}
        </>
    )

};

export default PayInvoiceModal;
