import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRanch } from '../../store/ranch-store';
import { getOpenInvoices } from "../../store/invoice-store";

import "./ranchSide.css";

const RanchHome = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        console.log("Ranch Home.js dispatch of getRanch")
        dispatch(getRanch(user.ranch_id));
        dispatch(getOpenInvoices(user.ranch_id));
    }, [dispatch]);

    const ranch = useSelector(state => state.ranch.ranch);
    const openInvoices = useSelector(state => state.invoice);

    let bookings;
    if (ranch) {
        bookings = Object.values(ranch?.bookings);
    }
    // console.log("from ranch object", ranch?.bookings)
    // console.log("variable bookings", bookings)

    return (
        <div className="under-nav">
            <h1>Ranch Dashboard</h1>
            <div className="ranch-dashboard">
                <div id="dashboard-one">
                    <p className="dashboard-p">{user?.full_name}</p>
                    <p className="dashboard-p"><NavLink to='/staff/profile'>{ranch?.ranch_name}</NavLink></p>
                </div>
                <div id="dashboard-two">
                    <p>Upcoming Bookings</p>
                    {(bookings) ? bookings?.map((booking) => {
                        let start = new Date(booking?.start_date);
                        let end = new Date(booking?.end_date);
                        if (Date.parse(start) < Date.now()) {
                            return null;
                        };
                        return ( <div key={booking?.id}>
                            <p className="dashboard-p">{booking?.guest}</p>
                            <p className="dashboard-p">{booking?.cabin}</p>
                            <p className="dashboard-p">{start?.toDateString()}</p>
                            <p className="dashboard-p">{end?.toDateString()}</p>
                            <NavLink to={`/staff/booking/${booking?.id}/invoice`}>View or Create Invoice</NavLink>
                        </div> )
                    }) : null}
                </div>
                <div id="dashboard-three">
                    <p>Open Invoices</p>
                </div>
                <div id="dashboard-four">
                    <p>Available Cabins</p>
                </div>
            </div>
        </div>
    )
 }

 export default RanchHome;
