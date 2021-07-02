import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRanch } from '../../store/ranch-store';
import EditRanchModal from '../RanchSide/EditRanchModal';

import "./ranchSide.css";

const RanchProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        // console.log("RanchProfile.js dispatch of getRanch")
        dispatch(getRanch(user.ranch_id))
    }, [dispatch, user])


    const ranch = useSelector(state => state.ranch.ranch);
    let cabins;
    if (ranch) {
        cabins = Object.values(ranch?.cabins);
    };
    // console.log("cabins from ranh profile.js", cabins)

    return (
        <div className="under-nav">
            <h1>{ranch?.ranch_name}</h1>
            <EditRanchModal ranch={ranch}/>
            <ul>
                <li>{ranch?.location}</li>
                {(ranch?.description) ? (<li>{ranch?.description}</li>) : (<li>"Description is blank"</li>)}
                <li>Nightly Rate: ${ranch?.rate}</li>
                <li> Cabins and Rooms:
                    <ul>
                        {cabins?.map((cabin) => {
                            return ( <li key={cabin.id}>{cabin.name}</li> )
                        })}
                        <li><NavLink to="/staff/lodgings">Add or Edit Lodging</NavLink></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default RanchProfile;
