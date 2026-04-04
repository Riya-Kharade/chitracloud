import React, { useState } from "react";
import UserPool from "../UserPool";
import { CognitoUser } from "amazon-cognito-identity-js";
import "./AuthForm.css";

function Register({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1); // 👈 1 = signup, 2 = OTP

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // 🔐 SIGN UP
  const onSignUp = (e) => {
    e.preventDefault();

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.log(err);

        if (err.code === "UsernameExistsException") {
          setErrorMessage("User already exists. Please verify OTP or login.");
          setStep(2); // 👈 move to OTP step
        } else {
          setErrorMessage(err.message);
        }

        setSuccessMessage("");
      } else {
        setUser(data.user);
        setStep(2); // 👈 move to OTP step

        setErrorMessage("");
        setSuccessMessage("OTP sent to your email ✅");
      }
    });
  };

  // 🔁 RESEND OTP
  const resendOTP = () => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        setErrorMessage(err.message);
        setSuccessMessage("");
      } else {
        setSuccessMessage("OTP resent successfully ✅");
        setErrorMessage("");
      }
    });
  };

  // 🔁 CONFIRM OTP
  const onConfirmOtp = (e) => {
    e.preventDefault();

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    cognitoUser.confirmRegistration(otp, true, (err, data) => {
      if (err) {
        setErrorMessage(err.message);
        setSuccessMessage("");
      } else {
        setSuccessMessage("Registration successful 🎉");
        setErrorMessage("");

        localStorage.setItem("userId", email);

        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    });
  };

  return (
    <>
      <h2 className="title">Register</h2>

      {/* STEP 1 → SIGNUP */}
      {step === 1 && (
        <form onSubmit={onSignUp}>
          <input
            className="input"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="button">Register</button>
        </form>
      )}

      {/* STEP 2 → OTP */}
      {step === 2 && (
        <form onSubmit={onConfirmOtp}>
          <input
            className="input"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button className="button">Verify OTP</button>

          <button
            type="button"
            className="button"
            style={{ marginTop: "10px", background: "#888" }}
            onClick={resendOTP}
          >
            Resend OTP
          </button>
        </form>
      )}

      {/* Messages */}
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && (
        <p style={{ color: "green", textAlign: "center" }}>
          {successMessage}
        </p>
      )}
    </>
  );
}

export default Register;