import React from "react";
import ProgressBar from "../ProceedToCheckOut/ProgressBar";
import { Link, Outlet, useMatch } from "react-router-dom";
import "./Breadcrumbs.css";
function Breadcrumbs() {
  const match = useMatch("/checkout/*");
  if (!match) {
    return null;
  }

  const routes = match.pathname.split("/").filter(Boolean);
  return (
    <>
      <ProgressBar />
      <nav className="breadcrumb-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {routes.map((route, index) => (
            <li key={index}>
              <strong>{` > `}</strong>
              <Link to={`/${routes.slice(0, index + 1).join("/")}`}>
                {route === "checkout" ? "Checkout" : "Confirm Order"}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Outlet />
    </>
  );
}

export default Breadcrumbs;
