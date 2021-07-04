import React, { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";

import { deleteBooking, getBookings } from "../../../store/booking-store";

const DeleteBookingModal = ({booking}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        showModal && dispatch(getBookings(booking.guest_id));
    }, [dispatch, booking.guest_id, showModal]);

    const deleteButton = (e) => {
        dispatch(deleteBooking(booking.id));
        setShowModal(false);
        dispatch(getBookings(booking?.id))
    };

    return (
        <>
            <button type="button" onClick={() => setShowModal(true)}>Cancel Booking</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="confirm-modal-box">
                        <div className="modal-confirmation-msg">
                            <p>Are you sure you want to cancel this booking?</p>
                        </div>
                        <div className="modal-buttons">
                            <button type="button" onClick={deleteButton}>Confirm</button>
                            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default DeleteBookingModal;
