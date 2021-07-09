import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings } from "../../../store/booking-store"

import AddReviewModal from './AddReviewModal';
import EditReviewModal from './EditReviewModal';
import DeleteReviewModal from './DeleteReviewModal';
import "../guestSide.css";

const MyReviews = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getBookings(user?.id))
    }, [dispatch, user.id]);

    const bookings = Object.values(useSelector(state => state.booking));
    console.log("bookings on my reviews page", bookings)
    return (
        <div className="under-nav">
            <h1>My Reviews</h1>
            <div className="info-display">
                {(bookings) ? bookings?.map((booking) => {
                    let start = new Date(booking?.start_date);
                    let end = new Date(booking?.end_date);
                    if (Date.parse(start) > Date.now()) {
                        return null;
                    };

                    return (
                        <div className="info-entry" key={booking?.id}>
                            <p className="dashboard-p">{booking?.ranch}, {booking?.cabin}</p>
                            <p className="dashboard-p">{start?.toDateString()} - {end?.toDateString()}</p>

                            {(booking?.reviews?.length) ? booking?.reviews?.map(review =>
                                (<>
                                <p>{review.content}</p>
                                <EditReviewModal review={review} />
                                <DeleteReviewModal review={review} />
                                </>)
                            ) : (
                            <AddReviewModal booking={booking} />)}
                        </div>
                    )
                }) : null}
            </div>
        </div>
    )
};

export default MyReviews;
