//ranch details page as seen by a casual visitor

import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getRanch } from '../../store/ranch-store';

import "../RanchSide/ranchSide.css";

const RanchProfile = () => {
    const dispatch = useDispatch();

    const ranch = useSelector(state => state.ranch.ranch);

    const ranchId = useParams();
    useEffect(() => {
        dispatch(getRanch(ranchId));
    })

    return (
        <div className="under-nav">
            <h1>{ranch?.ranch_name}</h1>
            <h2>Public facing ranch page</h2>
        </div>
    )

}

export default RanchProfile;
