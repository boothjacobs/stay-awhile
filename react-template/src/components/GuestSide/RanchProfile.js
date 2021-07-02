//ranch details page as seen by a casual visitor

import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRanch } from '../../store/ranch-store';

import "../RanchSide/ranchSide.css";

const RanchProfile = () => {

    return (
        <div className="under-nav">
            <h2>Public facing ranch page</h2>
        </div>
    )

}

export default RanchProfile;
