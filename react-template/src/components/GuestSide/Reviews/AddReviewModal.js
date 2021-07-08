import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from "../../../context/Modal";
import { getOneBooking } from '../../../store/booking-store';
import { addReview } from "../../../store/review-store";

const AddReviewModal = ({booking}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const [content, setContent] = useState("");
    const [stars, setStars] = useState("");

    // useEffect(() => {
    //     showModal && dispatch(getOneBooking(booking?.id));
    // }, [dispatch, booking?.id, showModal]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("content", content);
        formData.append("stars", stars);
        formData.append("guest_id", booking.guest_id);
        formData.append("ranch_id", booking.ranch_id);

        dispatch(addReview(formData, booking.id));
        setShowModal(false);
    };

    return (
        <>
            <button type="button" onClick={() => setShowModal(true)}>Add a Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="form-box">
                    <h3 className="modal-head">Add a Review</h3>
                        <form className="modal-form" onSubmit={handleSubmit}>
                        <label>Tell Us About Your Experience...
                            <textarea
                                name="content"
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                                /></label>
                        <label>Rating
                            <input
                                type="number"
                                name="stars"
                                onChange={(e) => setStars(e.target.value)}
                                value={stars}
                            ></input></label>
                            <div className="modal-buttons">
                                <button type="submit">Post Review</button>
                                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )

};

export default AddReviewModal;
