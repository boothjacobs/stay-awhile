import React from 'react';
import { useSelector } from 'react-redux';
import RanchHome from "../RanchSide/RanchHome";
import GuestHome from "../GuestSide/GuestHome";

const Home = () => {
    const user = useSelector(state => state.session.user);

    if (user.staff) {
        return <RanchHome />
    } else {
        return <GuestHome />
    }

}

export default Home;
