import React, { useState } from "react";
import "./SellerAuth.css"; 

const SellerAuth = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
    gst: "",
  });

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

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Handle signup form submission here
    console.log("Signup data:", signupData);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle login form submission here
    console.log("Login data:", loginData);
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
              id="name"
              name="name"
              className="seller-input-field"
              value={signupData.name}
              onChange={handleSignupChange}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="seller-input-field"
              value={signupData.email}
              onChange={handleSignupChange}
            />

            <label htmlFor="mobile">Mobile:</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              className="seller-input-field"
              value={signupData.mobile}
              onChange={handleSignupChange}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="seller-input-field"
              value={signupData.password}
              onChange={handleSignupChange}
            />

            <label htmlFor="cpassword">Confirm Password:</label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              className="seller-input-field"
              value={signupData.cpassword}
              onChange={handleSignupChange}
            />

            <label htmlFor="gst">GST:</label>
            <input
              type="text"
              id="gst"
              name="gst"
              className="seller-input-field"
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
    </div>
  );
};

export default SellerAuth;
