import React, { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import { useDispatch } from "react-redux";

import { getOneBooking } from "../../../store/booking-store";
import { deleteReview } from "../../../store/review-store";

const DeleteReviewModal = ({review}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        showModal && dispatch(getOneBooking(review.booking_id));
    }, [dispatch, review.booking_id, showModal]);

    const deleteButton = (e) => {
        dispatch(deleteReview(review.booking_id, review.id));
        setShowModal(false);
        dispatch(getOneBooking(review.booking_id))
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
