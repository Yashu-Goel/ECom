// // import React from "react";
// // import "./Progressbar.css";

// // const ProgressBar = () => {
// //   return (
// //     <div className="checkout-bar-container">
// //       <ol id="progress-bar">
// //         <li className="step-done">Product Added</li>
// //         <li className="step-done">Shipping Address</li>
// //         <li className="step-todo">Confirm Order</li>
// //         <li className="step-todo">Payment</li>
// //       </ol>
// //     </div>
// //   );
// // };

// // export default ProgressBar;
// import React from "react";
// import { useLocation } from "react-router-dom";
// import "./Progressbar.css";

// const ProgressBar = () => {
//   const location = useLocation();

//   const steps = [
//     { label: "Product Added", path: "/product-added" },
//     { label: "Shipping Address", path: "/shipping-address" },
//     { label: "Confirm Order", path: "/order-confirmation" },
//     { label: "Payment", path: "/payment" },
//   ];

//   const getCurrentStepIndex = () => {
//     return steps.findIndex((step) => step.path === location.pathname);
//   };

//   return (
//     <div className="checkout-bar-container">
//       <ol id="progress-bar">
//         {steps.map((step, index) => (
//           <li
//             key={step.label}
//             className={`step ${
//               index <= getCurrentStepIndex() ? "step-done" : "step-todo"
//             }`}
//           >
//             {step.label}
//           </li>
//         ))}
//       </ol>
//     </div>
//   );
// };

// export default ProgressBar;
import React from "react";
import { useLocation, Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Progressbar.css";

const ProgressBar = () => {
  const location = useLocation();

  const steps = [
    { label: "Product Added", path: "/" },
    { label: "Shipping Address", path: "/shipping-address" },
    { label: "Confirm Order", path: "/order-confirmation" },
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
            }`}
          >
            <Link to={step.path == "/payment" ? "" : step.path}>
              {step.label}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProgressBar;
