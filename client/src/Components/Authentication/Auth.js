import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [contentInIsloading, setContent] = useState("Login Success..");
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
    setButtonLoad(true);
    if (!isLogin && password !== cpassword) {
      setError("Passwords do not match.");
      setButtonLoad(false);
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
        await axios.post(API_BASE + "/userlogin", { email, password }, config);
        setIsLoading(true);
        setTimeout(() => {
          setContent("Redirecting to home page...");
        }, 1500);
        setTimeout(() => {
          navigate("/");
        }, 2500);
      } catch (error) {
        toast.error(error.response.data);
        return;
      } finally {
        setButtonLoad(false);
      }
    } else {
      setContent("Registraion Successful!!");
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        await axios.post(
          API_BASE + "/usersignup",
          {
            name,
            email,
            password,
          },
          config
        );
        setIsLoading(true);
        setTimeout(() => {
          setContent("Redirecting to home page...");
        }, 1500);
        setTimeout(() => {
          navigate("/");
        }, 2500);
      } catch (error) {
        toast.error(error.response.data);
        return;
      } finally {
        setButtonLoad(false);
      }
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setButtonLoad(false);
  };
  return (
    <div className="container">
      <h2 className="title">{isLogin ? "Login" : "Signup"}</h2>
      <form
        onSubmit={handleSubmit}
        className="form"
        onClick={(e) => setError(" ")}
      >
        {!isLogin && (
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Enter you name"
              required
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
            placeholder="Enter your email id"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            placeholder="Enter password"
            required
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
              required
            />
          </div>
        )}
        {error && <p className="error">{error}</p>}

        {!buttonLoad && (
          <button type="submit" className="btn-auth">
            {isLogin ? "Login" : "Signup"}
          </button>
        )}
        {buttonLoad && (
          <button type="submit" className="btn-auth">
            <i class="fa fa-spinner fa-spin"></i>
            {isLogin ? "  Logging In.." : "  Signing Up.."}
          </button>
        )}
      </form>
      <p className="switch">
        {isLogin ? "Don't have an account?  " : "Already have an account?  "}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setError("");
          }}
          className="switch-btn"
        >
          {isLogin ? " Signup" : " Login"}
        </button>
      </p>
      {isLoading && (
        <div className="loading-modal">
          <p className="loading-spinner"></p>
          <p>{contentInIsloading}</p>
          <br />
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
};

export default Auth;
