import React, { useState } from "react";
import UserPool from "../UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import "./AuthForm.css";

function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onLogin = (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: () => {
        localStorage.setItem("userId", email);
        onSuccess();
      },
      onFailure: (err) => {
        setErrorMessage(err.message || "Login failed");
      },
    });
  };

  return (
    <>
      <h2 className="title">Login</h2>

      <form onSubmit={onLogin}>
        <input
          className="input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button">Login</button>
      </form>

      {errorMessage && <p className="error">{errorMessage}</p>}
    </>
  );
}

export default Login;