import React from "react";
import { Link, Outlet, useMatch } from "react-router-dom";
import "./Breadcrumbs.css";

function Breadcrumbs({
  LinkText,
  RouteOne,
  RouteTwo = false,
  ComponentOne = false,
  customStyle = {},
}) {
  const match = useMatch(`/${LinkText}/*`);
  if (!match) {
    return null;
  }

  const routes = match.pathname.split("/").filter(Boolean);
  return (
    <>
      {ComponentOne && ComponentOne}
      <nav className="breadcrumb-nav" style={customStyle}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {routes.map((route, index) => (
            <li key={index}>
              <strong>{` > `}</strong>
              <Link to={`/${routes.slice(0, index + 1).join("/")}`}>
                {route === `${LinkText}`
                  ? `${RouteOne && RouteOne}`
                  : `${RouteTwo && RouteTwo}`}
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
