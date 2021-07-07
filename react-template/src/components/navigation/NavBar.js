import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout, demoGuest, demoStaff } from '../../store/session';
import "./nav.css";

const NavBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    // console.log("nav bar user from selector", user)

    const onLogout = async (e) => {
        dispatch(logout());
    };

    const loginDemoStaff = async (e) => {
      dispatch(demoStaff());
    };

    const loginDemoGuest = async (e) => {
      dispatch(demoGuest());
    };

  return (
    <nav>
      <ul id="nav-list">
        <li className="nav-li">
          <NavLink to="/home" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>

        {(user?.staff) ? (
            <li className="nav-li">
              <NavLink to="/staff/profile" exact={true} activeClassName="active">
                Your Ranch
              </NavLink>
            </li>) : (
              <li className="nav-li">
                <NavLink to="/destinations" exact={true} activeClassName="active">
                  Browse Destinations
                </NavLink></li>
            )}

        {(user !== null) ? (
          <li className="nav-li">
            <button onClick={onLogout}>Logout</button>
          </li>) : (<>
            <li className="nav-li">
              <button onClick={loginDemoStaff}>Demo as Staff</button>
            </li>
            <li className="nav-li">
              <button onClick={loginDemoGuest}>Demo as Customer</button>
            </li>
            <li className="nav-li">
              <NavLink to="/login" exact={true} activeClassName="active">
                Login
              </NavLink>
            </li>
            <li className="nav-li">
              <NavLink to="/signup" exact={true} activeClassName="active">
                Sign Up
              </NavLink>
            </li>
        </>)}
      </ul>
    </nav>
  );
}

export default NavBar;
