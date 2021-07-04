import React, { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { editBooking, getBookings} from "../../../store/booking-store";
import { getRanch } from "../../../store/ranch-store";

const EditBookingModal = ({booking}) => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const [cabin_id, setCabin] = useState(booking.cabin_id);
    const [interests, setInterests] = useState(booking.interests);
    const [start_date, setStartDate] = useState(booking.start_date);
    const [end_date, setEndDate] = useState(booking.end_date);
    const [guest_count, setGuestCount] = useState(booking.guest_count);

    useEffect(() => {
        showModal && dispatch(getBookings(booking.guest_id));
        showModal && dispatch(getRanch(booking.ranch_id));
    }, [dispatch, booking.guest_id, booking.ranch_id, showModal]);

    const ranch = useSelector(state => state.ranch.ranch);
    console.log(ranch?.cabins)

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        // formData.append("name", name);
        // formData.append("beds", beds);
        // formData.append("total_capacity", total_capacity);
        // formData.append("image", image);

        dispatch(editBooking(formData));
        setShowModal(false);
    };

    return (
        <>
            <button type="button" onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="form-box">
                        <h3 className="modal-head">Edit Booking Details</h3>
                        <form className="modal-form" onSubmit={handleSubmit}>
                        {/* <label>Cabin or Room Name
                            <input
                                type="text"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                ></input></label>
                        <label>How Many Beds?
                            <input
                                type="number"
                                name="beds"
                                onChange={(e) => setBeds(e.target.value)}
                                value={beds}
                            ></input></label>
                        <label>Sleeps How Many People?
                            <input
                                type="number"
                                name="total_capacity"
                                onChange={(e) => setCapacity(e.target.value)}
                                value={total_capacity}
                            ></input></label>
                        <label>{(cabin.img_url) ? ("Replace Photo--leave blank to keep current file") : ("Add Photo")}
                            <input
                                type="file"
                                name="image"
                                onChange={getImage}
                                // value={image}
                                ></input></label> */}
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

export default EditBookingModal;
