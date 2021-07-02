import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const GuestHome = () => {
    const user = useSelector(state => state.session.user);

    let bookings;
    if (user) {
        bookings = Object.values(user.bookings);
    }

    return (
        <div className="under-nav">
            <h1>Guest Home</h1>
            <div className="guest-dashboard">
                <div id="dashboard-one">
                    <p className="dashboard-p">{user?.full_name}</p>
                    <p>Upcoming Bookings</p>
                    {(bookings) ? bookings?.map((booking) => {
                        let start = new Date(booking?.start_date);
                        let end = new Date(booking?.end_date);
                        if (Date.parse(start) < Date.now()) {
                            return null;
                        };
                        return ( <div key={booking?.id}>
                            <p className="dashboard-p">{booking?.ranch}</p>
                            <p className="dashboard-p">{booking?.cabin}</p>
                            <p className="dashboard-p">{booking?.interests}</p>
                            <p className="dashboard-p">{start?.toDateString()}</p>
                            <p className="dashboard-p">{end?.toDateString()}</p>
                        </div> )
                    }) : null}
                </div>
                <div id="dashboard-two">
                    <p>Your Past Experiences</p>
                    {(bookings) ? bookings?.map((booking) => {
                        let start = new Date(booking?.start_date);
                        let end = new Date(booking?.end_date);
                        if (Date.parse(start) > Date.now()) {
                            return null;
                        };
                        return ( <div key={booking?.id}>
                            <p className="dashboard-p">{booking?.ranch}</p>
                            <p className="dashboard-p">{booking?.cabin}</p>
                            <p className="dashboard-p">{booking?.interests}</p>
                            <p className="dashboard-p">{start?.toDateString()}</p>
                            <p className="dashboard-p">{end?.toDateString()}</p>
                        </div> )
                    }) : null}
                </div>
                <div id="dashboard-three">
                    <p>Open Invoices</p>
                </div>

            </div>
        </div>
    )
}

export default GuestHome;
