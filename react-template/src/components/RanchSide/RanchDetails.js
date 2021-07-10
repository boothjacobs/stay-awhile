import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRanch } from '../../store/ranch-store';
import EditRanchModal from './EditRanchModal';

import "./ranchSide.css";

const RanchDetails = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        // console.log("RanchProfile.js dispatch of getRanch")
        dispatch(getRanch(user.ranch_id))
    }, [dispatch, user])


    const ranch = useSelector(state => state.ranch);
    // let cabins = Object.values(user.ranch.cabins);
    const cabins = Object.values(useSelector(state => state.cabin));
    // console.log("cabins from ranh profile.js", cabins)

    return (
        <div id="ranch-details-js">
            <table id="ranch-detail">
                <thead>
                    <tr className="detail-table"><th colspan="1"> <h1>{ranch?.ranch_name}</h1> </th></tr>
                </thead>
                <tbody>
                    <tr className="detail-table"> <EditRanchModal ranch={ranch}/> </tr>
                    <tr className="detail-table">{ranch?.location}</tr>
                    <tr className="detail-table">{(ranch?.description) ? (<p>{ranch?.description}</p>) : (<p>Description is blank</p>)}</tr>
                    <tr className="detail-table"> Nightly Rate: ${ranch?.rate} </tr>
                    <tr className="detail-table">Cabins and Rooms:</tr>
                    <tr className="detail-table">

                            {cabins?.map((cabin) => {
                                return ( <p key={cabin.id}>{cabin.name}</p> )
                            })}

                    </tr>
                    <tr className="detail-table"><NavLink to="/staff/lodgings">Add or Edit Lodging</NavLink></tr>
                </tbody>
            </table>
        </div>
    )
}

export default RanchDetails;
