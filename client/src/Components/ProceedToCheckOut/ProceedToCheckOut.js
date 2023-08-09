import React, { useState } from "react";
import "./ProceedToCheckOut.css";

const ProceedToCheckOut = () => {
  // const [currentStep, setCurrentStep] = useState(1);

  // const handleClick = (step) => {
  //   setCurrentStep(step);
  // };

  return (
    <div>
      {/* <Address /> */}
      {/* <div className="progress-bar">
        <div
          className={`step ${currentStep === 1 ? "active" : ""}`}
          onClick={() => handleClick(1)}
        >
          Shipping Details
        </div>
        <div
          className={`step ${currentStep === 2 ? "active" : ""}`}
          onClick={() => handleClick(2)}
        >
          Confirm Order
        </div>
        <div
          className={`step ${currentStep === 3 ? "active" : ""}`}
          onClick={() => handleClick(3)}
        >
          Payment
        </div>
      </div>
      <div className="step-content">
        {currentStep === 1 && <ShippingDetails />}
        {currentStep === 2 && <ConfirmOrder />}
        {currentStep === 3 && <Payment />}
      </div> */}
    </div>
  );
};

const ShippingDetails = () => {
  return <h2>Shipping Details Component</h2>;
};

const ConfirmOrder = () => {
  return <h2>Confirm Order Component</h2>;
};

const Payment = () => {
  return <h2>Payment Component</h2>;
};

export default ProceedToCheckOut;
