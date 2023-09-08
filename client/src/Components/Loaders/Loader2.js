import React from "react";
import "./Loading.css";
const Loader2 = ({ content }) => {
  return (
    <div className="loader2-container">
      <div className="dots"></div>
      <div>{content}</div>
    </div>
  );
};

export default Loader2;
