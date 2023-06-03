import React, { useState } from "react";
import "./Auth.css";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (!email || !password) {
      setError("Please fill in all the fields.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Perform login or signup logic here
    if (isLogin) {
      // Perform login
      console.log("Login:", email, password);
    } else {
      // Perform signup
      console.log("Signup:", email, password);
    }

    // Reset form fields and error state
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <div className="container">
      <h2 className="title">{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit} className="form">
        {!isLogin && (
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="yashu goel"
            />
          </div>
        )}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="xyz@gmail.com"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            placeholder="********"
          />
        </div>
        <p className="switch">
          {isLogin && (
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="forgot-pass"
            >forgot password?</button>
          )}
        </p>
        {!isLogin && (
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              placeholder="Confirm Password"
            />
          </div>
        )}
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn">
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>
      <p className="switch">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
          className="switch-btn"
        >
          {isLogin ? "Signup" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default Auth;
