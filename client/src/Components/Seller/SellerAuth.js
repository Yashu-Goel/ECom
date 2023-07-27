import React, { useState, useContext } from "react";
import "./SellerAuth.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { SellerContext } from "./SellerProvider";
const SellerAuth = () => {
  const { isLoggedIn, toggleLoginStatus, logout } = useContext(SellerContext); 
   const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
    gst: "",
  });

  const API_BASE = "http://localhost:5000";
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(true);

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const { name, email, mobile, password, cpassword, gst } = signupData;

    if (!name || !email || !mobile || !password || !cpassword) {
      toast.error("Fill all details");
      return;
    }

    if (password !== cpassword) {
      toast.error("Password and Confirm Password must be the same");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        API_BASE + "/seller/sellersignup",
        {
          name,
          email,
          mobile,
          password,
          cpassword,
          gst,
        },
        config
      );

      toast.success("Registration successful");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginData;

    if (!email || !password) {
      toast.error("Fill in all details");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        API_BASE + "/seller/sellerlogin",
        { email, password },
        config
      );
        console.log("data: "+ data);
      toast.success("Login successful");
      toggleLoginStatus();
      setTimeout(() => {
        navigate("/seller");
      }, 5000);
    } catch (error) {
      console.log("Error: "+ error);
      toast.error(error.response.data);
    }
  };

  const handleSwitchForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <div className="seller-container">
      {isLogin ? (
        <>
          <h1>Login</h1>
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="seller-input-field"
              value={loginData.email}
              onChange={handleLoginChange}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              className="seller-input-field"
              value={loginData.password}
              onChange={handleLoginChange}
            />

            <button type="submit" className="seller-submit-button">
              Login
            </button>
          </form>
          <p>
            Don't have an account?{" "}
            <button className="seller-switch-button" onClick={handleSwitchForm}>
              Signup
            </button>
          </p>
        </>
      ) : (
        <>
          <h1>Signup</h1>
          <form onSubmit={handleSignupSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="seller-input-field"
              value={signupData.name}
              onChange={handleSignupChange}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="seller-input-field"
              value={signupData.email}
              onChange={handleSignupChange}
            />

            <label htmlFor="mobile">Mobile:</label>
            <input
              type="text"
              name="mobile"
              className="seller-input-field"
              value={signupData.mobile}
              onChange={handleSignupChange}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              className="seller-input-field"
              value={signupData.password}
              onChange={handleSignupChange}
            />

            <label htmlFor="cpassword">Confirm Password:</label>
            <input
              type="password"
              name="cpassword"
              className="seller-input-field"
              value={signupData.cpassword}
              onChange={handleSignupChange}
            />

            <label htmlFor="gst">GST:</label>
            <input
              type="text"
              name="gst"
              className="seller-input-field"
              minLength="15"
              max="15"
              value={signupData.gst}
              onChange={handleSignupChange}
            />

            <button type="submit" className="seller-submit-button">
              Signup
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <button className="seller-switch-button" onClick={handleSwitchForm}>
              Login
            </button>
          </p>
        </>
      )}
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
};

export default SellerAuth;
