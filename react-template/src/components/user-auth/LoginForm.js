import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = dispatch(login(email, password));
    if (!user.errors) { setErrors(user.errors) };
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="form-box">
      <h3 className="auth-head">Log in to an existing account</h3>
      <form className="auth-form" onSubmit={onLogin}>
        <div>
          {errors?.map((error) => (
            <div>{error}</div>
          ))}
        </div>
          <label htmlFor="email">Email
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          /></label>
          <label htmlFor="password">Password
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          /></label>
          <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
