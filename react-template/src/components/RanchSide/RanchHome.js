import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRanch } from '../../store/ranch-store';
import { getCabins } from "../../store/cabin-store";
import { getOpenInvoices } from "../../store/invoice-store";

import "./ranchSide.css";

const RanchHome = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const loaded = useSelector(state => state.session.loaded);

    useEffect(() => {
        // console.log("Ranch Home.js dispatch of getRanch")
        dispatch(getRanch(user?.ranch_id));
        dispatch(getOpenInvoices(user?.ranch_id));
        dispatch(getCabins(user?.ranch_id));
    }, [dispatch]);

    const ranch = useSelector(state => state.ranch);
    const openInvoices = useSelector(state => state.invoice.invoices);
    const cabins = Object.values(useSelector(state => state.cabin));

    // console.log("RANCH STORE from ranch home", ranch)
    // console.log("USER FROM RANCH HOME", user)
    // console.log("cabins from ranch home", cabins)

    let bookings;
    if (ranch.bookings) {
        bookings = Object.values(ranch?.bookings);
        // console.log("bookings from ranch", bookings)
    };


    return loaded && (
        <div id="ranch-home-background">
        <div id="ranch-home-js">
            <h1>Ranch Dashboard</h1>
            <div className="ranch-dashboard">
                <div id="dashboard-one">
                    <p className="dashboard-p">{user?.full_name}</p>
                    <p className="dashboard-p"><NavLink to='/staff/profile'>{ranch?.ranch_name}</NavLink></p>
                </div>
                <div id="dashboard-two">
                    <div>
                        <h4>Upcoming Bookings</h4>
                        <NavLink to={`/staff/${user.ranch_id}/bookings`}>See All Bookings</NavLink>
                    </div>
                    <div id="bookings-grid">
                        {(bookings) ? bookings?.map((booking) => {
                            let start = new Date(booking?.start_date);
                            let end = new Date(booking?.end_date);
                            if (Date.parse(start) < Date.now()) {
                                return null;
                            };
                            return ( <div className="info-entry" key={booking?.id}>
                                <p className="dashboard-p">{booking?.guest}</p>
                                <p className="dashboard-p">{booking?.cabin}</p>
                                <p className="dashboard-p">{start?.toDateString()}</p>
                                <p className="dashboard-p">{end?.toDateString()}</p>
                                <NavLink to={`/staff/booking/${booking?.id}/invoice`}>View or Create Invoice</NavLink>
                            </div> )
                        }) : null}
                    </div>
                </div>
                <div id="dashboard-three">
                    <div id="invoice-grid-top">
                        <h4>Open Invoices</h4>
                        <NavLink to={`/staff/${user.ranch_id}/invoice`}>See All Invoices</NavLink>
                    </div>
                    <div id="invoice-grid-bottom">
                        {openInvoices?.map((invoice) => {
                            return (
                                <div className="existing-invoice-render">
                                    <h4>Invoice No. {invoice.id}</h4>
                                    <div className="invoice-boolean">
                                        Deposit: {invoice?.deposit ? (<p>Paid</p>) : (<p>Unpaid</p>)}
                                    </div>
                                    <p>Amount Due: {invoice?.amount_due}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div id="dashboard-four">
                    <div id="dash-cabin-list">
                        <h4>Available Cabins</h4>
                        {cabins?.map(cabin => <div>{cabin.name}</div>)}
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
 }

 export default RanchHome;
