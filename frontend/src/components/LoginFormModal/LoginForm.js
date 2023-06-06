import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

import DemoLoginButton from "../Navigation/DemoLoginButton";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.loginThunk({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data) {
          const errors = {};
          errors.credential = data.message;
          setErrors(errors);
        }
      }
    );
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Log In</h1>
      {/* <fieldset> */}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="error-wrapper">
          {errors.credential && <p className="errors">The provided credentials were invalid!</p>}
        </div>
        <label>
          {/* Username or Email */}
          <input
            type="text"
            value={credential}
            placeholder="Username or Email"
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          {/* Password */}
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          className={credential.length >= 4 && password.length >= 6 ? "login-submit-button" : "login-submit-button-not"}
          type="submit"
          disabled={credential.length < 4 || password.length < 6}
        >
          Log In
        </button>
      </form>
      {/* </fieldset> */}

      <DemoLoginButton />
    </div>
  );
}
export default LoginForm;
