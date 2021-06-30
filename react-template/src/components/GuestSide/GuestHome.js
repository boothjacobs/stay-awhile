import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const GuestHome = () => {
    const user = useSelector(state => state.session.user);
    return (
        <>
            <h1>Guest Home</h1>
            <div className="guest-dashboard">
                <div id="dashboard-one">
                    <p className="dashboard-p">{user?.full_name}</p>
                    <p>Upcoming Bookings</p>
                </div>
                <div id="dashboard-two">
                    <p>Your Past Experiences</p>
                </div>
                <div id="dashboard-three">
                    <p>Open Invoices</p>
                </div>

            </div>
        </>
    )
}

export default GuestHome;
