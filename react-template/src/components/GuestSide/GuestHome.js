import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getBookings } from "../../store/booking-store"
import { getUserInvoices } from '../../store/invoice-store';

import "./guestSide.css";

const GuestHome = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getBookings(user?.id));
        dispatch(getUserInvoices(user?.id));
    }, [dispatch, user.id]);

    const bookings = Object.values(useSelector(state => state.booking));
    const invoices = Object.values(useSelector(state => state.invoice));
    // console.log("useSelector invoices", invoices)

    return (
        <div className="under-nav">
            <div className="dashboard-header">
                <h1>Guest Home</h1>
                <h2>{user?.full_name}</h2>
            </div>
            <div className="guest-dashboard">
                <div id="dashboard-one">
                    <NavLink to="/guest/bookings" className="dashboard-header"><h3>Upcoming Bookings</h3></NavLink>
                    <div className="info-display">
                        {(bookings) ? bookings?.map((booking) => {
                            let start = new Date(booking?.start_date);
                            let end = new Date(booking?.end_date);
                            if (Date.parse(start) < Date.now()) {
                                return null;
                            };
                            return ( <div className="info-entry" key={booking?.id}>
                                <p className="dashboard-p">{booking?.ranch}</p>
                                <p className="dashboard-p">{start?.toDateString()}</p>
                                <p className="dashboard-p">{end?.toDateString()}</p>
                            </div> )
                        }) : null}
                    </div>

                </div>
                <div id="dashboard-two">
                <NavLink to="/guest/reviews" className="dashboard-header"><h3>Your Past Experiences</h3></NavLink>
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
                    <NavLink to="/guest/invoices" className="dashboard-header"><h3>Open Invoices</h3></NavLink>
                    {invoices?.map((invoice) => {
                        if (invoice?.amount_due > 0) {
                            return (
                            <div className="under-nav">
                                <div id="existing-invoice-render">
                                    <h4>Invoice No. {invoice.id}</h4>
                                    <div className="invoice-boolean">
                                        Deposit: {invoice?.deposit ? (<p>Paid</p>) : (<p>Unpaid</p>)}
                                    </div>
                                    <p>Amount Due: {invoice?.amount_due}</p>
                                </div>
                            </div>
                            )
                        }
                    })}

                </div>

            </div>
        </div>
    )
}

export default GuestHome;
