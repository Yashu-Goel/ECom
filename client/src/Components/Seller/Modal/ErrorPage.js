import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css"
const ErrorPage = () => {
  return (
    <div className="ErrorPageOuter">
      <div className="ErrorPageMain">
        <div className="ErrorPageHeading">
          <h1>Access Denied!!</h1>
        </div>
        <div className="ErrorPageSubHeading">
          <h3>Possible Reasons for access denial</h3>
          <ul>
            <li>Unauthorized Access</li>
            <li>Admin Blocked</li>
            <li>Expired Session</li>
            <li>Invalid Credentials</li>
          </ul>
        </div>
        <div className="ErrorPageMsg">
          <span>Try to Login again</span>
        </div>
        <div className="ErrorPageButton">
          <Link to="/seller">
            <button>Go to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
