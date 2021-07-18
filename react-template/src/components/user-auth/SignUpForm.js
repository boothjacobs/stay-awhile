import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./auth.css";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const loaded = useSelector(state => state.session.loaded);
  const authErrors = useSelector(state => state.session.loaded.error);

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
  const [nightly_rate, setRate] = useState("");

  const onSignUp = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(signUp(full_name,
        email,
        password,
        age, phone, dietary_restrictions, eContact, staff, //nullable fields
        ranch_name, location, description, nightly_rate   //conditional fields for staff accounts only, to create Ranch
      ));
    } else {
      window.alert("Passwords do not match");
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
  const updateLocation = (e) => { setLocation(e.target.value) };
  const updateDescription = (e) => { setDescription(e.target.value) };
  const updateRate = (e) => { setRate(e.target.value) };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="under-nav">
      <div className="form-box">
        <h3 className="auth-head">Sign up for an account</h3>
        <form className="auth-form" onSubmit={onSignUp}>
          <div>
            {authErrors?.map((error) => (
              <div>{error}</div>
            ))}
          </div>
            <label>Full Name
            <input
              type="text" required
              name="full_name"
              onChange={updateFullname}
              value={full_name}
            ></input></label>
            <label>Email
            <input
              type="text" required
              name="email"
              onChange={updateEmail}
              value={email}
            ></input></label>
            <label>Password
            <input
              type="password" required
              name="password"
              onChange={updatePassword}
              value={password}
            ></input></label>
            <label>Confirm Password
            <input
              type="password" required
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
              value="True"
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
                      required
                      name="nightly_rate"
                      onChange={updateRate}
                      value={nightly_rate}
                    ></input></label>
            </div>
          ) : null}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
