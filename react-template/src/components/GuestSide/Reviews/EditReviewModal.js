import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from "../../../context/Modal";
import { getOneBooking } from '../../../store/booking-store';
import { editReview } from "../../../store/review-store";

const EditReviewModal = ({review}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const [content, setContent] = useState(review.content);
    const [stars, setStars] = useState(review.stars);

    useEffect(() => {
        showModal && dispatch(getOneBooking(review.booking_id));
    }, [dispatch, review.booking_id, showModal]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("content", content);
        formData.append("stars", stars);

        dispatch(editReview(formData, review.booking_id, review.id));
        setShowModal(false);
    };

    return (
        <>
            <button type="button" onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="form-box">
                        <h3 className="modal-head">Edit Review</h3>
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
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )

};

export default EditReviewModal;
