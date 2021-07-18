import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from "../../../context/Modal";
import { getUserInvoices, userPayInvoice } from '../../../store/invoice-store';

const PayInvoiceModal = ({invoice}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);
    const [formButton, setFormButton] = useState(true);

    const [payment_amount, setPaymentAmount] = useState(0);

    const formReveal = (e) => {
        setFormButton(false);
    };

    const updateDeposit = (e) => {
        if (e.target.value === "add-deposit") {
            setPaymentAmount(invoice.total / 4);
        } else {
            setPaymentAmount(0);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("payment_amount", payment_amount);

        dispatch(userPayInvoice(user?.id, invoice.id, formData));

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
                    {formButton ? <button type="button" onClick={formReveal}>Make Payment</button> : (
                        <form onSubmit={handleSubmit}>
                            {invoice?.deposit ? null : (<label>
                                Pay Deposit Only: ${invoice?.deposit}
                                <input type="checkbox" value="add-deposit"
                                onChange={updateDeposit} />
                            </label>)}
                            <label>Amount to Pay:
                                <input type="number"
                                value={payment_amount}
                                onChange={(e) => setPaymentAmount(e.target.value)}/>
                            </label>
                            <button>Submit Payment</button>
                        </form>
                    )}
                </div>
            </Modal>
        )}
        </>
    )

};

export default PayInvoiceModal;
