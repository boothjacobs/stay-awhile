import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRanch } from '../../store/ranch-store';

import "./ranchSide.css";

const RanchProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getRanch(user.ranch_id))
    }, [dispatch, user])


    const ranch = useSelector(state => state.ranch.ranch);
    let cabins;
    if (ranch) {
        cabins = Object.values(ranch?.cabins);
    }
    console.log("cabins in ranch profile", cabins)

    return (
        <>
            <h1>{ranch?.ranch_name}</h1>
            <ul>
                <li>{ranch?.location}</li>
                <li>{(ranch?.description) ? ("Weird syntax problem in RanchProfile.js line 26") : ("Description is blank")}</li>
                <li>Nightly Rate: ${ranch?.rate}</li>
                <li> Cabins:
                    <ul>
                        {cabins?.map((cabin) => {
                            console.log("map", cabin);
                            return ( <li>{cabin.name}</li> )
                        })}
                    </ul>

                </li>
            </ul>
        </>
    )
}

export default RanchProfile;
