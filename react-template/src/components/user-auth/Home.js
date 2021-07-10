import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import RanchHome from "../RanchSide/RanchHome";
import GuestHome from "../GuestSide/GuestHome";

const Home = () => {
    const user = useSelector(state => state.session.user);
    console.log(user)
    if (user.staff) {
        return <RanchHome />
    } else if (!user.full_name) {
        return <Redirect to="/" />
    } else {
        return <GuestHome />
    }

}

export default Home;
