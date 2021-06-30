import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRanch } from '../../store/ranch-store';

import "./ranchSide.css";

const RanchHome = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getRanch(user.ranch_id))
    }, [dispatch, user])

    const ranch = useSelector(state => state.ranch.ranch);
    // console.log(ranch.ranch_name)

    return (
        <>
            <h1>Ranch Dashboard</h1>
            <div className="ranch-dashboard">
                <div id="dashboard-one">
                    <p className="dashboard-p">{user?.full_name}</p>
                    <p className="dashboard-p">{ranch?.ranch_name}</p>
                </div>
                <div id="dashboard-two">
                    <p>Upcoming Bookings</p>
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
