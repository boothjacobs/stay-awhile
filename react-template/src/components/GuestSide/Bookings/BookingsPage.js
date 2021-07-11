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
        <div id="bookings-page-js">
            <div className="dashboard-header">
                <h1>Booking Details</h1>
            </div>
            <div className="info-display">
                {bookings?.map((booking) => {
                    const startDate = new Date(booking?.start_date);
                    const endDate = new Date(booking?.end_date);
                    const invoice = booking?.invoice[0]

                    if (startDate > Date.now()) {
                        return (
                            <div className="info-entry" key={booking?.id}>
                                <p className="dashboard-p">{booking?.ranch}</p>
                                <p className="dashboard-p">{booking?.cabin}</p>
                                <p className="dashboard-p"> Arrive {startDate.toDateString()}</p>
                                <p className="dashboard-p"> Depart {endDate.toDateString()}</p>
                                <p className="dashboard-p">{booking?.guest_count} guests</p>
                                <p className="dashboard-p">{booking?.interests}</p>
                                <p>Remaining Balance: ${invoice?.amount_due} <br />
                                {invoice?.amount_due > 0 ? (<NavLink to="/guest/invoices">See Invoice</NavLink>) : null}
                                </p>
                                    <div className="modal-buttons">
                                        <EditBookingModal booking={booking} className="one-modal" />
                                        {invoice ? null : <DeleteBookingModal booking={booking} className="one-modal" />}
                                    </div>
                            </div>
                        )
                    }
                    // console.log(invoice)
                })}
            </div>
        </div>
    )
}

export default BookingsPage;
