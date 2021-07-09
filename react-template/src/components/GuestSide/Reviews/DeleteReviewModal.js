import React, { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";

import { getBookings } from "../../../store/booking-store";
import { deleteReview } from "../../../store/review-store";

const DeleteReviewModal = ({review}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [showModal, setShowModal] = useState(false);

    const deleteButton = (e) => {
        dispatch(deleteReview(review.booking_id, review.id));
        setShowModal(false);
        dispatch(getBookings(user?.id));
        };

    return (
        <>
            <button type="button" onClick={() => setShowModal(true)}>Remove Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="confirm-modal-box">
                        <div className="modal-confirmation-msg">
                            <p>Are you sure you want to delete this review?</p>
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

export default DeleteReviewModal;
