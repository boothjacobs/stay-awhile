import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRanchBookings } from "../../store/booking-store";

import "./ranchSide.css";

const AllBookings = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getRanchBookings(user?.ranch_id));
    }, [dispatch, user?.ranch_id]);

    const ranch = useSelector(state => state.ranch);
    const bookings = Object.values(useSelector(state => state.booking));

    return (
        <div id="all-bookings-background">
            <div className="under-nav">
                <h2>All Bookings</h2>
            <div id="bookings-grid">
                <div id="upcoming-only">
                <h4>Upcoming</h4>
                    {(bookings) ? bookings?.map((booking) => {
                        let start = new Date(booking?.start_date);
                        let end = new Date(booking?.end_date);
                        if (Date.parse(start) < Date.now()) {
                            return null;
                        };
                        return ( <div className="bookkeep-entry" key={booking?.id}>
                            <p className="booking-list-sm">{booking?.guest}</p>
                            <p className="booking-list-sm">{booking?.cabin}</p>
                            <p className="booking-list-sm">{start?.toDateString()}</p>
                            <p className="booking-list-sm">{end?.toDateString()}</p>
                            <NavLink to={`/staff/booking/${booking?.id}/invoice`}>View or Create Invoice</NavLink>
                        </div> )
                    }) : null}
                </div>
                <div id="past-only">
                <h4>Past</h4>
                    {(bookings) ? bookings?.map((booking) => {
                        let start = new Date(booking?.start_date);
                        let end = new Date(booking?.end_date);
                        if (Date.parse(start) > Date.now()) {
                            return null;
                        };
                        return ( <div className="bookkeep-entry" key={booking?.id}>
                            <p className="booking-list-sm">{booking?.guest}</p>
                            <p className="booking-list-sm">{booking?.cabin}</p>
                            <p className="booking-list-sm">{start?.toDateString()}</p>
                            <p className="booking-list-sm">{end?.toDateString()}</p>
                            <NavLink to={`/staff/booking/${booking?.id}/invoice`}>View Invoice</NavLink>
                        </div> )
                    }) : null}
                </div>
            </div>
            </div>
        </div>
    )
}

export default AllBookings;
