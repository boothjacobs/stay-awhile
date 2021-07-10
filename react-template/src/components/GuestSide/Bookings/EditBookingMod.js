import React, { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { editBooking, getBookings} from "../../../store/booking-store";
import { getRanch } from "../../../store/ranch-store";

const EditBookingModal = ({booking}) => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    //parsing date values into format usable by HTML input field!!! more trouble than it was worth
    const sDate = (new Date(booking.start_date)).toISOString();
    let sT = sDate.indexOf("T");
    const startDate = sDate.slice(0, sT);
    const [start_date, setStartDate] = useState(startDate);

    const eDate = (new Date(booking.end_date)).toISOString();
    let eT = eDate.indexOf("T");
    const endDate = eDate.slice(0, eT);
    const [end_date, setEndDate] = useState(endDate);

    const [cabin_id, setCabin] = useState(booking.cabin_id);
    const [interests, setInterests] = useState(booking.interests);
    const [guest_count, setGuestCount] = useState(booking.guest_count);
    const [total, setTotal] = useState(booking.total);

    useEffect(() => {
        showModal && dispatch(getBookings(booking.guest_id));
        showModal && dispatch(getRanch(booking.ranch_id));
    }, [dispatch, booking.guest_id, booking.ranch_id, showModal]);

    const ranch = useSelector(state => state.ranch);
    let cabins;
    if (ranch) {
        cabins = Object.values(ranch.cabins);
    };
    // console.log("edit modal cabins", cabins)
    // console.log("edit modal ranch", ranch)

    const updateStartDate = (e) => {
        setStartDate(e.target.value);
        setTotal(calculateTotal(guest_count));
    };

    const updateEndDate = (e) => {
        setEndDate(e.target.value);
        setTotal(calculateTotal(guest_count));
    };

    const updateGuestCount = (e) => {
        setGuestCount(e.target.value);
        setTotal(calculateTotal(e.target.value));
    };

    const calculateTotal = (guestCount) => {

        let duration;
        const start = (new Date(start_date)).getDate();
        const end = (new Date(end_date)).getDate();

        duration = end - start;

        if ((new Date(start_date)).getMonth() === (9 || 4 || 6 || 11)) {
            if (duration < 1) duration += (30 - start)
        } else if ((new Date(start_date)).getMonth() === 2) {
            if (duration < 1) duration += (28 - start)
        } else {
            if (duration < 1) duration += (31 - start)
        }
        // console.log("result of calculateTotal", duration, bookingStart, bookingEnd)
        return duration * ranch?.rate * guestCount;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("cabin_id", cabin_id);
        formData.append("interests", interests);
        formData.append("start_date", start_date);
        formData.append("end_date", end_date);
        formData.append("guest_count", guest_count);
        formData.append("total", total);

        dispatch(editBooking(formData, booking.id));
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
                            <div className="booking-form-dates">
                                <label>Arrival Date
                                    <input type="date" required
                                    onChange={updateStartDate}
                                    value={start_date}/>
                                </label>
                                <label>Departure Date
                                    <input type="date" required
                                    onChange={updateEndDate}
                                    value={end_date}/>
                                </label>
                            </div>
                                <label>Choose Cabin or Room:
                                    <select name="cabin_id" value={cabin_id} onChange={(e) => setCabin(e.target.value)}>
                                        <option>--Select Preferred Cabin--</option>
                                        {cabins?.map((cabin) => {
                                            return (<option value={cabin.id}>{cabin.name}, {cabin.beds} beds</option>)
                                        })}
                                    </select>
                                </label>
                                <label>Activities of Interest:
                                    <select name="interests" value={interests} onChange={(e) => setInterests(e.target.value)}>
                                        <option>Hiking</option>
                                        <option>Horseback Riding</option>
                                        <option>Fishing</option>
                                        <option>Shooting</option>
                                    </select>
                                </label>
                                <label>Number of Guests:
                                    <input type="number" value={guest_count}
                                    onChange={updateGuestCount}/>
                                </label>
                                <h3>Rate per night: ${ranch?.rate}</h3>
                                <h4>Total: ${total}</h4>
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
