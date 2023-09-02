import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./Components/Context/UserProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import App from "./App";
import store from "./Components/A-redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider store={store}>
      <UserProvider>
        <App />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          theme="colored"
        />
      </UserProvider>
    </Provider>
  </Router>
);
