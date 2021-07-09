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
        // console.log("Ranch Home.js dispatch of getRanch")
        dispatch(getRanch(user.ranch_id));
        dispatch(getOpenInvoices(user.ranch_id));
    }, [dispatch]);

    const ranch = useSelector(state => state.ranch.ranch);
    const openInvoices = useSelector(state => state.invoice.invoices);

    let bookings;
    let cabins;
    if (ranch) {
        bookings = Object.values(ranch?.bookings);
        cabins = Object.values(ranch?.cabins);
    };

    return (
        <div className="under-nav">
            <h1>Ranch Dashboard</h1>
            <div className="ranch-dashboard">
                <div id="dashboard-one">
                    <p className="dashboard-p">{user?.full_name}</p>
                    <p className="dashboard-p"><NavLink to='/staff/profile'>{ranch?.ranch_name}</NavLink></p>
                </div>
                <div id="dashboard-two">
                    <h4>Upcoming Bookings</h4>
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
                    <div>
                        <p>Open Invoices</p>
                        <NavLink to={`/staff/${user.ranch_id}/invoice`}>See All Invoices</NavLink>
                    </div>
                    {openInvoices?.map((invoice) => {
                            return (
                                <div id="existing-invoice-render">
                                    <h4>Invoice No. {invoice.id}</h4>
                                    <div className="invoice-boolean">
                                        Deposit: {invoice?.deposit ? (<p>Paid</p>) : (<p>Unpaid</p>)}
                                    </div>
                                    <p>Amount Due: {invoice?.amount_due}</p>
                                </div>
                            )
                    })}
                </div>
                <div id="dashboard-four">
                    <h4>Available Cabins</h4>
                    {cabins?.map(cabin => <p>{cabin.name}</p>)}
                </div>
            </div>


        </div>
    )
 }

 export default RanchHome;
