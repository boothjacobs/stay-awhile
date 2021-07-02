import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRanch } from '../../store/ranch-store';

import "./ranchSide.css";

const RanchHome = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        console.log("Ranch Home.js dispatch of getRanch")
        dispatch(getRanch(user.ranch_id))
    }, [dispatch, user])

    const ranch = useSelector(state => state.ranch.ranch);
    let bookings;
    if (ranch) {
        bookings = Object.values(ranch?.bookings);
    }
    // console.log("from ranch object", ranch?.bookings)
    // console.log("variable bookings", bookings)

    return (
        <>
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
                            <p className="dashboard-p">{booking?.interests}</p>
                            <p className="dashboard-p">{start?.toDateString()}</p>
                            <p className="dashboard-p">{end?.toDateString()}</p>
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
        </>
    )
 }

 export default RanchHome;
