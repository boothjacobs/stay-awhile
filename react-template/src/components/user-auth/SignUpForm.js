import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./auth.css";

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
  const [staff, setStaff] = useState(false);
  const [ranchName, setRanchName] = useState("");
  const [rate, setRate] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // const formData = new FormData();
      // console.log(fullName, email, password, age, phone, dietary, eContact, staff)
      // formData.append("full_name", fullName);
      // formData.append("email", email);
      // formData.append("password", password);
      // formData.append("age", age);
      // formData.append("phone", phone);
      // formData.append("dietary_restrictions", dietary);
      // formData.append("eContact", eContact);
      // formData.append("staff", staff);
      dispatch(signUp(fullName, email, password, age, phone, dietary, eContact, staff));
    }
  };

  const updateFullname = (e) => { setFullname(e.target.value) };

  const updateEmail = (e) => { setEmail(e.target.value) };

  const updatePassword = (e) => { setPassword(e.target.value) };

  const updateConfirmPassword = (e) => { setConfirmPassword(e.target.value) };

  const updateAge = (e) => { setAge(e.target.value) };

  const updatePhone = (e) => { setPhone(e.target.value) };

  const updateDietary = (e) => { setDietary(e.target.value) };

  const updateEContact = (e) => { setEContact(e.target.value) };

  const updateStaff = (e) => { setStaff(e.target.value) };

  const updateRanchName = (e) => { setRanchName(e.target.value) };

  const updateRate = (e) => { setRate(e.target.value) };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="form-box">
      <form className="auth-form" onSubmit={onSignUp}>
          <label>Full Name
          <input
            type="text"
            name="full_name"
            onChange={updateFullname}
            value={fullName}
          ></input></label>
          <label>Email
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input></label>
          <label>Password
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input></label>
          <label>Confirm Password
          <input
            type="password"
            name="confirm_password"
            onChange={updateConfirmPassword}
            value={confirmPassword}
            required={true}
          ></input></label>
          <label>Age
          <input
            type="number"
            name="age"
            onChange={updateAge}
            value={age}
          ></input></label>
          <label>Phone Number
          <input
            type="tel"
            name="phone"
            onChange={updatePhone}
            value={phone}
          ></input></label>
          <label>Dietary Restrictions
          <select
            name="dietary_restrictions"
            onChange={updateDietary}
            value={dietary}>
              <option value="None">None</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Gluten-Free">Gluten-Free</option>
              <option value="Allergy">Allergy (other)</option>
          </select></label>
          <label>Emergency Contact
          <input
            type="text"
            name="eContact"
            onChange={updateEContact}
            value={eContact}
          ></input></label>
          <label>Ranch Staff?
          <input
            type="checkbox"
            name="staff"
            onChange={updateStaff}
            value={staff}
          ></input></label>
        {(staff) ? (
          <div className="ranch-fields">
              <label>Ranch Name
              <input
                type="text"
                name="ranch_name"
                onChange={updateRanchName}
                value={ranchName}
              ></input></label>
                <label>Base Nightly Rate
                <input
                  type="number"
                  name="ranch_rate"
                  onChange={updateRate}
                  value={rate}
                ></input></label>
          </div>
        ) : null}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
