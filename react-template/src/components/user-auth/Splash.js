import React from "react";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "./auth.css";

const Splash = () => {

    const user = useSelector(state => state.session.user)

    if (user) {
        return <Redirect to="/home" />;
    }

    return (
        <div id="splash-background">
        {/* <div className="under-nav"> */}
            <div id="splash-page">
                <div id="login">
                    <LoginForm />
                </div>
                <div id="signup">
                    <SignUpForm />
                </div>
            </div>
        {/* </div> */}
        </div>
    )
}


export default Splash;
