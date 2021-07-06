import React, { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getInvoice, deleteInvoice } from "../../../store/invoice-store";

const DeleteInvoiceModal = ({invoice}) => {
    const dispatch = useDispatch();
    const booking = useSelector(state => state.booking);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        showModal && dispatch(getInvoice(booking.id));
    }, [dispatch, booking.id, showModal]);

    const deleteButton = (e) => {
        dispatch(deleteInvoice(booking.id, invoice.id));
        setShowModal(false);
        dispatch(getInvoice(booking.id));
    };

    return (
        <>
            <button type="button" onClick={() => setShowModal(true)}>Delete</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="confirm-modal-box">
                        <div className="modal-confirmation-msg">
                            <p>Are you sure you want to delete invoice #{invoice.id} from your records?</p>
                        </div>
                        <div className="modal-buttons">
                            <button type="button" onClick={deleteButton}>Confirm Delete</button>
                            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )

}

export default DeleteInvoiceModal;
