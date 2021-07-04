import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings } from "../../store/booking-store"

import "./guestSide.css";

const GuestHome = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getBookings(user?.id))
    }, [dispatch, user.id]);

    const bookings = Object.values(useSelector(state => state.booking));
    // let bookings;
    // if (user) {
    //     bookings = Object.values(user.bookings);
    // };

    return (
        <div className="under-nav">
            <h1>Guest Home</h1>
            <h3>{user?.full_name}</h3>
            <div className="guest-dashboard">
                <div id="dashboard-one">
                    <h3>Upcoming Bookings</h3>
                    <div className="info-display">
                        {(bookings) ? bookings?.map((booking) => {
                            let start = new Date(booking?.start_date);
                            let end = new Date(booking?.end_date);
                            if (Date.parse(start) < Date.now()) {
                                return null;
                            };
                            return ( <div className="info-entry" key={booking?.id}>
                                <p className="dashboard-p">{booking?.ranch}</p>
                                <p className="dashboard-p">{booking?.cabin}</p>
                                <p className="dashboard-p">{booking?.interests}</p>
                                <p className="dashboard-p">{start?.toDateString()}</p>
                                <p className="dashboard-p">{end?.toDateString()}</p>
                            </div> )
                        }) : null}
                    </div>

                </div>
                <div id="dashboard-two">
                    <h3>Your Past Experiences</h3>
                    <div className="info-display">
                        {(bookings) ? bookings?.map((booking) => {
                            let start = new Date(booking?.start_date);
                            let end = new Date(booking?.end_date);
                            if (Date.parse(start) > Date.now()) {
                                return null;
                            };
                            return ( <div className="info-entry" key={booking?.id}>
                                <p className="dashboard-p">{booking?.ranch}</p>
                                <p className="dashboard-p">{booking?.cabin}</p>
                                <p className="dashboard-p">{booking?.interests}</p>
                                <p className="dashboard-p">{start?.toDateString()}</p>
                                <p className="dashboard-p">{end?.toDateString()}</p>
                            </div> )
                        }) : null}
                    </div>
                </div>
                <div id="dashboard-three">
                    <h3>Open Invoices</h3>
                </div>

            </div>
        </div>
    )
}

export default GuestHome;
