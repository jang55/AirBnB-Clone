import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom";
import LoginForm from "../LoginFormModal/LoginForm";

function SignupForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disableButton, setDisableButton] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  useEffect(() => {
    console.log(agreeToTerms);
  }, [agreeToTerms]);

  useEffect(() => {
    if (
      email.length > 0 &&
      username.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0
    ) {
      setDisableButton(false);
      return;
    }
    setDisableButton(true);
  }, [email, username, firstName, lastName, password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      dispatch(
        sessionActions.signupThunk({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
          return;
        }
      });
      history.push("/");
      return;
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <>
      {!showLoginForm && (
        <div className="signup-container">
          <h1 className="signup-header">Sign Up</h1>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label>{/* Email */}</label>
            <input
              type="text"
              value={email}
              className="signup-inputs"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="errors">{errors.email}</p>}
            <label>{/* Username */}</label>
            <input
              type="text"
              value={username}
              className="signup-inputs"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && <p className="errors">{errors.username}</p>}
            <label>{/* First Name */}</label>
            <input
              type="text"
              value={firstName}
              className="signup-inputs"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            {errors.firstName && <p className="errors">{errors.firstName}</p>}
            <label>{/* Last Name */}</label>
            <input
              type="text"
              value={lastName}
              className="signup-inputs"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            {errors.lastName && <p className="errors">{errors.lastName}</p>}
            <label>{/* Password */}</label>
            <input
              type="password"
              value={password}
              className="signup-inputs"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className="errors">{errors.password}</p>}
            <label>{/* Confirm Password */}</label>
            <input
              type="password"
              value={confirmPassword}
              className="signup-inputs"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && (
              <p className="errors">{errors.confirmPassword}</p>
            )}
            <button
              disabled={
                disableButton ||
                username.length < 4 ||
                password.length < 6 ||
                password !== confirmPassword ||
                !agreeToTerms
              }
              className={
                disableButton ||
                username.length < 4 ||
                password.length < 6 ||
                password !== confirmPassword ||
                !agreeToTerms
                  ? "signup-submit-button-not"
                  : "signup-submit-button"
              }
              type="submit"
            >
              Sign Up
            </button>
            <div className="sign-up-checkboxes">
              <div>
                <input
                  type="checkBox"
                  value={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(!agreeToTerms)}
                />
                <label className="news-text">
                  Agree to Terms and Conditions
                </label>
              </div>
              <div>
                <input type="checkBox" />
                <label className="news-text">
                  Subscribe to newsletter from CampBnB
                </label>
              </div>
            </div>
          </form>
          <div>
            <div className="have-an-account-text-container">
              <span>Already have an account? </span>
              <span
                className="click-here-text"
                onClick={() => setShowLoginForm(true)}
              >
                Click Here
              </span>
            </div>
          </div>
        </div>
      )}
      {showLoginForm && (
        <div onClick={() => setShowLoginForm(true)}>
          <LoginForm />
        </div>
      )}
    </>
  );
}

export default SignupForm;
