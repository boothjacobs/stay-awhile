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
    // console.log("bookings on my reviews page", bookings)
    return (
        <div id="my-reviews-background">
        <div id="my-reviews-js">
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
                            <p className="review-head">{booking?.ranch}, {booking?.cabin}</p>
                            <p className="review-head">{start?.toDateString()} - {end?.toDateString()}</p>

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
                }) : <div className="info-entry">You haven't been anywhere yet!</div>}
            </div>
        </div>
        </div>
    )
};

export default MyReviews;
