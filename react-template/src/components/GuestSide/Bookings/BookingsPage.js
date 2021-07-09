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
            <div className="dashboard-header">
                <h1>booking details</h1>
            </div>
            <div className="info-display">
                {bookings?.map((booking) => {
                    const startDate = new Date(booking?.start_date);
                    const endDate = new Date(booking?.end_date);
                    if (startDate > Date.now()) {
                        return (
                            <div className="info-entry" key={booking?.id}>
                                <p className="dashboard-p">{booking?.ranch}</p>
                                <p className="dashboard-p">{booking?.cabin}</p>
                                <p className="dashboard-p"> Arrive {startDate.toDateString()}</p>
                                <p className="dashboard-p"> Depart {endDate.toDateString()}</p>
                                <p className="dashboard-p">{booking?.guest_count} guests</p>
                                <p className="dashboard-p">{booking?.interests}</p>
                                <p>${booking?.total} indicate if unpaid, link to invoice</p>
                                    <div className="modal-buttons">
                                        <EditBookingModal booking={booking} className="one-modal" />
                                        <DeleteBookingModal booking={booking} className="one-modal" />
                                    </div>
                            </div>
                        )
                    }
                })
            }
            </div>
        </div>
    )
}

export default BookingsPage;
