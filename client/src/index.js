import { SkeletonTheme } from "react-loading-skeleton";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./Components/Context/UserProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "react-loading-skeleton/dist/skeleton.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
      <UserProvider>
        <App />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          theme="colored"
        />
      </UserProvider>
    </SkeletonTheme>
  </Router>
);
