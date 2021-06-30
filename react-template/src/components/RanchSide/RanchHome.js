import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
const RanchHome = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const ranch = useSelector(state => state.ranch);
    console.log(ranch)

    return (
        <>
            <h1>Ranch Dashboard</h1>
            <p>{user?.full_name}</p>
            <p>{user?.ranch}</p>
        </>
    )
 }

 export default RanchHome;
