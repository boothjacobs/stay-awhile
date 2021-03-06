import React, { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { editInvoice, getInvoice } from "../../../store/invoice-store";

const EditInvoiceModal = ({invoice}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const booking = useSelector(state => state.booking);

    const [additional_charges, setAddCharges] = useState(invoice.additional_charges);
    const [deposit, setDepos] = useState(invoice.deposit);
    const [rollover, setRollover] = useState(invoice.rollover);
    const [amount_paid, setAmtPaid] = useState(invoice.amount_paid);

    useEffect(() => {
        showModal && dispatch(getInvoice(booking.id));
    }, [dispatch, booking.id, showModal]);

    const amountDue = (prevTotal, charges, amountPaid) => {
        return Number(prevTotal) + Number(charges) - Number(amountPaid);
    };

    const updateDeposit = (e) => {
        setDepos(e.target.value);
        if (deposit === "paid") {
            setAmtPaid(booking.total / 4);
        } else {
            setAmtPaid(0)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("additional_charges", additional_charges);
        formData.append("deposit", deposit);
        formData.append("rollover_payment", rollover);
        formData.append("amount_paid", amount_paid);
        formData.append("amount_due", amountDue(booking.total, additional_charges, amount_paid))

        dispatch(editInvoice(booking.id, invoice.id, formData));
        setShowModal(false);
    };

    return (
        <>
            <button type="button" onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="form-box">
                        <h3 className="modal-head">Edit Invoice Details</h3>
                        <form className="modal-form" onSubmit={handleSubmit}>
                            <label>Total from Booking: ${booking?.total}</label> {/* read only */}
                            <label>Additional charges:
                                <input type="number" required
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
                            <div className="modal-buttons">
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )

}

export default EditInvoiceModal;
