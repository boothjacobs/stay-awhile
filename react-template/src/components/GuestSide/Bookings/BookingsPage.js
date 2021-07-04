import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getBookings } from "../../../store/booking-store";
import EditBookingModal from './EditBookingMod';
import DeleteBookingModal from './DeleteBookMod';

import "../guestSide.css";

const BookingsPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getBookings(user?.id));
    }, [dispatch, user.id]);

    const bookings = Object.values(useSelector(state => state.booking));

    return (
        <div className="under-nav">
        <h1>booking details</h1>
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
                    <p className="dashboard-p">Arrive {start?.toDateString()}</p>
                    <p className="dashboard-p">Depart {end?.toDateString()}</p>
                    <p className="dashboard-p">{booking?.guest_count} guests</p>
                    <p className="dashboard-p">{booking?.interests}</p>
                    <p>Link to Invoice {booking?.total} indicate if unpaid</p>
                    <EditBookingModal booking={booking} />
                    <DeleteBookingModal booking={booking} />
                </div> )
            }) : null}
                    </div>
        </div>
    )
}

export default BookingsPage;
