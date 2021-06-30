import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./auth.css";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [full_name, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [dietary_restrictions, setDietary] = useState("None");
  const [eContact, setEContact] = useState("");
  const [staff, setStaff] = useState(false);
  const [ranch_name, setRanchName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(signUp(full_name,
        email,
        password,
        age, phone, dietary_restrictions, eContact, staff, //nullable fields
        ranch_name, location, description, rate   //conditional fields for staff accounts only, to create Ranch
      ));
    }
  };

  const updateFullname = (e) => {
    // console.log("inside update Full Name function", e.target.value)
    setFullname(e.target.value)
    // console.log(fullName, user)
  };

  const updateEmail = (e) => { setEmail(e.target.value) };
  const updatePassword = (e) => { setPassword(e.target.value) };
  const updateConfirmPassword = (e) => { setConfirmPassword(e.target.value) };
  const updateAge = (e) => { setAge(e.target.value) };
  const updatePhone = (e) => { setPhone(e.target.value) };
  const updateDietary = (e) => { setDietary(e.target.value) };
  const updateEContact = (e) => { setEContact(e.target.value) };
  const updateStaff = (e) => { setStaff(e.target.value) };
  const updateRanchName = (e) => { setRanchName(e.target.value) };
  const updateLocation = (e) => { setLocation(e.target.value) };
  const updateDescription = (e) => { setDescription(e.target.value) };
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
            value={full_name}
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
            value={dietary_restrictions}>
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
                  value={ranch_name}
                ></input></label>
              <label>Ranch Location
                <input
                  type="text"
                  name="location"
                  onChange={updateLocation}
                  value={location}
                ></input></label>
              <label>Description
                <input
                  type="text"
                  name="description"
                  onChange={updateDescription}
                  value={description}
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
