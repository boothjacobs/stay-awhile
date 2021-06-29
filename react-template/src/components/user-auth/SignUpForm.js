import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [dietary, setDietary] = useState("");
  const [eContact, setEContact] = useState("");
  const [staff, setStaff] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(signUp(fullName, email, password));
    }
  };

  const updateFullname = (e) => {
    setFullname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const updateAge = (e) => {
    setAge(e.target.value);
  };

  const updatePhone = (e) => {
    setPhone(e.target.value);
  };

  const updateDietary = (e) => {
    setDietary(e.target.value);
  };

  const updateEContact = (e) => {
    setEContact(e.target.value);
  };

  const updateStaff = (e) => {
    setStaff(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        <label>User Name</label>
        <input
          type="text"
          name="fullName"
          onChange={updateFullname}
          value={fullName}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirm_password"
          onChange={updateConfirmPassword}
          value={confirmPassword}
          required={true}
        ></input>
      </div>
      <div>
        <label>Age</label>
        <input
          type="number"
          name="age"
          onChange={updateAge}
          value={age}
        ></input>
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          onChange={updatePhone}
          value={phone}
        ></input>
      </div>
      <div>
        <label>Dietary Restrictions</label>
        <select
          name="password"
          onChange={updatePassword}
          value={password}>
            <option value="None">None</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="Allergy">Allergy (other)</option>
        </select>
      </div>
      <div>
        <label>Emergency Contact</label>
        <input
          type="text"
          name="phone"
          onChange={updateEContact}
          value={eContact}
        ></input>
      </div>
      <div>
        <label>Ranch Staff?</label>
        <input
          type="checkbox"
          name="staff"
          onChange={updateStaff}
          value={staff}
        ></input>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
