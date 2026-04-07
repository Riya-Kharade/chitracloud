import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./AuthPage.css";

function AuthPage({ onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);

 return (
  <div className="authContainer">

    {/* ✅ ADD HERE */}
    <div className="authHeader">
      <h1>
        Welcome to <span className="brand">ChitraCloud</span>
      </h1>
      <p>Edit, enhance and manage your images in the cloud</p>
    </div>

    {/* EXISTING CARD */}
    <div className="authCard">

      <div className="authTabs">
        <button
          className={`authTab ${!isLogin ? "active" : ""}`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>

        <button
          className={`authTab ${isLogin ? "active" : ""}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
      </div>

      <div className="authContent">
        {isLogin ? (
          <Login onSuccess={onSuccess} />
        ) : (
          <Register onSuccess={onSuccess} />
        )}
      </div>

    </div>
  </div>
);
}

export default AuthPage;