import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.sessionState.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  // const checkErrors = (errArr) => {
  //   const result = {};
  //   errArr.forEach((errorMsg) => {
  //     const possibleErrMsg = {
  //       email: ["Invalid email", "User with that email already exists"],
  //       username: [
  //         "User with that username already exists",
  //         "Username is required",
  //         "Username cannot be an email.",
  //       ],
  //       password: ["Password must be 6 characters or more."],
  //       firstName: ["First Name is required"],
  //       lastName: ["Last Name is required"],
  //     };

  //     for (let key in possibleErrMsg) {
  //       if (possibleErrMsg[key].includes(errorMsg)) {
  //         result[key] = errorMsg;
  //       }
  //     }
  //   });
  //   return setErrors({
  //     ...errors,
  //     ...result,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
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
          // checkErrors(data.errors);
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <fieldset>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className="errors">{errors.email}</p>}
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && <p className="errors">{errors.username}</p>}
          <label>
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {errors.firstName && <p className="errors">{errors.firstName}</p>}
          <label>
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {errors.lastName && <p className="errors">{errors.lastName}</p>}
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="errors">{errors.password}</p>}
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && (
            <p className="errors">{errors.confirmPassword}</p>
          )}
          <button className="submit-button" type="submit">Sign Up</button>
        </form>
      </fieldset>
    </>
  );
}

export default SignupFormPage;
