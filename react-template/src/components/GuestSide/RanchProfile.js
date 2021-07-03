//ranch details page as seen by a casual visitor

import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getRanch } from '../../store/ranch-store';

import "../RanchSide/ranchSide.css";

const RanchProfile = () => {
    const dispatch = useDispatch();

    const ranchId = useParams().id;
    // console.log(ranchId)
    useEffect(() => {
        dispatch(getRanch(ranchId));
    }, [dispatch]);
    const ranch = useSelector(state => state.ranch.ranch);
    console.log("variable ranch: ", ranch)

    return (
        <div className="under-nav">
            <div className="ranch-profile">
                <div className="ranch-profile-pic">
                {/* <img src="/Users/sarahjacobs/Desktop/stay-awhile/react-template/src/background-img/lawn-horses.jpg" /> */}
                    <img src="../../../background-img/lawn-horses.jpg" alt="ranch-pic" />
                </div>
                <div className="ranch-profile-booking-header">
                    <h1>{ranch?.ranch_name}</h1>
                    <form>
                        <div className="booking-form-dates">
                            <label>Arrival Date
                                <input type="date"/>
                            </label>
                            <label>Departure Date
                                <input type="date"/>
                            </label>
                        </div>
                        <h3>Rate per night: ${ranch?.rate}</h3>
                        <h4>Total: ${}</h4>
                    </form>
                </div>
                <div className="ranch-profile-description">
                    <h3>About Us</h3>
                    {(ranch?.description) ? (<p>{ranch?.description}</p>) : (<p>Aenean dictum leo elementum, bibendum neque facilisis, interdum mauris. Praesent efficitur maximus arcu, vel tincidunt purus mattis vel.</p>)}
                </div>
                <div className="ranch-profile-details">
                    <h3>Services Offered</h3>
                    <p>Nullam aliquam tristique lectus in ultricies. Nunc vitae erat eleifend, vestibulum lectus eu,
                        mattis libero. Nulla tristique arcu orci, a volutpat mi interdum pretium. Aliquam purus nisi,
                        rutrum at dapibus in, laoreet ac quam. Nunc tincidunt sem a pharetra condimentum. </p>
                </div>
                <div className="ranch-profile-reviews">
                    <button type="button" onClick={(e) => window.alert("This button doesn't do anything right now.")}>Add A Review</button>
                    <div className="review-thumbnail">
                        <p><strong>Username</strong></p>
                        <p>Placeholder because reviews haven't been seeded yet</p>
                    </div>
                    <div className="review-thumbnail">
                        <p><strong>Username</strong></p>
                        <p>Placeholder because reviews haven't been seeded yet</p>
                    </div>
                    <div className="review-thumbnail">
                        <p><strong>Username</strong></p>
                        <p>Placeholder because reviews haven't been seeded yet</p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default RanchProfile;
