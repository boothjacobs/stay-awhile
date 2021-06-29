import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/session';

const NavBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    console.log("nav bar user from selector", user)

    const onLogout = async (e) => {
        dispatch(logout());
    };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        {(user !== null) ? (<li>
        <button onClick={onLogout}>Logout</button>
        </li>) : null}
      </ul>
    </nav>
  );
}

export default NavBar;
