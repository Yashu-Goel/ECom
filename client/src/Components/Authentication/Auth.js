import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [cpassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const API_BASE = "http://localhost:5000";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    if (!email || !password) {
      setError("Please fill in all the fields.");
      return;
    }

    if (!isLogin && password !== cpassword) {
      setError("Passwords do not match.");
      return;
    }

    // Perform login or signup logic here
    if (isLogin) {
      // Perform login
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data } = await axios.post(
          API_BASE + "/userlogin",
          { email, password },
          config
        );
        console.log(data);
        toast.success("Login Successfull..");
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } catch (error) {
        toast.error(error.message);
      }
      console.log("Login:", email, password);
    } else {
      // Perform signup
      if (!name || !email || !password || !cpassword) {
        window.alert("Fill all details!!");
        return;
      }

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          API_BASE + "/usersignup",
          {
            name,
            email,
            password,
            cpassword,
          },
          config
        );
        toast.success("Registration Successfull");
        console.log(data);
        setTimeout(window.location.reload(), 5000);
      } catch (error) {
        toast.error(error.message);
      }
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
            >
              forgot password?
            </button>
          )}
        </p>
        {!isLogin && (
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={cpassword}
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
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
};

export default Auth;
