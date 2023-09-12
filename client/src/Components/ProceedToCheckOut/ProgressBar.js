import React from "react";
import { useLocation } from "react-router-dom";
import "./Progressbar.css";

const ProgressBar = ({ paymentModal }) => {
  const location = useLocation();

  const steps = [
    { label: "Product Added", path: "/" },
    { label: "Shipping Address", path: "/checkout" },
    { label: "Confirm Order", path: "/checkout/confirm-order" },
    { label: "Payment", path: "/payment" },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.path === location.pathname);
  };

  return (
    <div className="checkout-bar-container">
      <ol id="progress-bar">
        {steps.map((step, index) => (
          <li
            key={step.label}
            className={`step ${
              index <= getCurrentStepIndex() ? "step-done" : "step-todo"
            } ${paymentModal ? "li" : ""} `}
          >
            <p>{step.label}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProgressBar;
