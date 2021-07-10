//ranch details page as seen by a casual visitor

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { getRanch } from '../../store/ranch-store';
import { addBooking } from "../../store/booking-store";
import { getReviews } from "../../store/review-store";
// import AddReviewModal from "./Reviews/AddReviewModal";
import EditReviewModal from "./Reviews/EditReviewModal";
import DeleteReviewModal from "./Reviews/DeleteReviewModal";

import "../RanchSide/ranchSide.css";

const RanchProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const ranch = useSelector(state => state.ranch);
    
    const bookings = useSelector(state => state.booking);
    const reviews = Object.values(useSelector(state => state.review));

    const ranchId = useParams().id;

    useEffect(() => {
        dispatch(getRanch(ranchId));
        dispatch(getReviews(ranchId));
    }, [dispatch, ranchId]);

    let cabins;
    if (ranch?.cabins) {
        cabins = Object.values(ranch?.cabins);
    };

    let myBookings;
    if (bookings) {
        myBookings = Object.values(bookings).filter((booking) => booking?.ranch_id === Number(ranchId))
    };
    // console.log("bookings", bookings)
    // console.log(myBookings)

    const [bookingStart, setBookingStart] = useState("");
    const [bookingEnd, setBookingEnd] = useState("");
    const [cabin_id, setCabinId] = useState("");
    const [interests, setInterests] = useState("");
    const [guestCount, setGuestCount] = useState(0);
    const [total, setTotal] = useState(0);

    const updateBookingStart = (e) => { setBookingStart(e.target.value) };
    const updateBookingEnd = (e) => { setBookingEnd(e.target.value) };
    const updateGuestCount = (e) => {
        setGuestCount(e.target.value);
        setTotal(calculateTotal(e.target.value));
    };

    const handleBooking = (e) => {
        e.preventDefault();
        if (!user) return <Redirect to="/login" />

        let formData = new FormData();
        formData.append("ranch_id", ranchId);
        formData.append("guest_id", user.id);
        formData.append("cabin_id", cabin_id);
        formData.append("interests", interests);
        formData.append("start_date", bookingStart);
        formData.append("end_date", bookingEnd);
        formData.append("guest_count", guestCount);
        formData.append("total", total);

        dispatch(addBooking(formData));
        history.push("/home");
    };

    const calculateTotal = (guestCount) => {
        if (!bookingEnd || !bookingStart) return 0;

        let duration;
        const start = (new Date(bookingStart)).getDate();
        const end = (new Date(bookingEnd)).getDate();

        duration = end - start;

        if ((new Date(bookingStart)).getMonth() === (9 || 4 || 6 || 11)) {
            if (duration < 1) duration += (30 - start)
        } else if ((new Date(bookingStart)).getMonth() === 2) {
            if (duration < 1) duration += (28 - start)
        } else {
            if (duration < 1) duration += (31 - start)
        }
        // console.log("result of calculateTotal", duration, bookingStart, bookingEnd)
        return duration * ranch?.rate * guestCount;
    };

    return (
        <div className="under-nav">
            <div className="ranch-profile">
                <div className="ranch-profile-pic">
                    <img src={ranch?.img_url} alt="ranch-pic" />
                </div>
                <div className="ranch-profile-booking-header">
                    <h1>{ranch?.ranch_name}</h1>
                    <form className="booking-form" onSubmit={handleBooking}>
                        <div className="booking-form-dates">
                            <label>Arrival Date
                                <input type="date" required
                                onChange={updateBookingStart}
                                value={bookingStart}/>
                            </label>
                            <label>Departure Date
                                <input type="date" required
                                onChange={updateBookingEnd}
                                value={bookingEnd}/>
                            </label>
                        </div>
                            <label>Choose Cabin or Room:
                                <select name="cabin_id" value={cabin_id} onChange={(e) => setCabinId(e.target.value)}>
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
                                <input type="number" value={guestCount} required
                                onChange={updateGuestCount}/>
                            </label>
                        <h3>Rate per night: ${ranch?.rate}</h3>
                        <h4>Total: ${total}</h4>
                        <button>Book Now</button>
                    </form>
                </div>
                <div className="ranch-profile-description">
                    <h3>About Us</h3>
                    {(ranch?.description) ? (<p>{ranch?.description}</p>) : (<p>Aenean dictum leo elementum, bibendum neque facilisis, interdum mauris. Praesent efficitur maximus arcu, vel tincidunt purus mattis vel.</p>)}
                </div>
                <div className="ranch-profile-details">
                    <h3>Services Offered</h3>
                    <p>Nullam aliquam tristique lectus in ultricies. Nunc vitae erat eleifend, vestibulum lectus eu,
                        mattis libero. Nulla tristique arcu orci, a volutpat mi interdum pretium. Aliquam purus nisi,
                        rutrum at dapibus in, laoreet ac quam. Nunc tincidunt sem a pharetra condimentum. </p>
                </div>
                <div>
                    {/* {user && myBookings ? (
                        <AddReviewModal booking={myBookings[0]} />
                    ) : null } */}
                    {reviews.map((review) => {
                        return (
                            <div className="review-thumbnail">
                                <p>{review.guest} {review.stars} stars</p>
                                <p>{review.content}</p>
                                {(review.guest === user?.full_name) ?
                                    (<>
                                        <EditReviewModal review={review} />
                                        <DeleteReviewModal review={review} />
                                    </>) : null}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default RanchProfile;
