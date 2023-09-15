import React from "react";
import { Link } from "react-router-dom";

const AccessDenied = () => {
  const reasons = [
    "Incomplete Checkout Process",
    "Empty Shopping Cart",
    "Unauthorized Access",
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            color: "#e74c3c",
            backgroundColor: "#f9f9f9",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            textTransform: "uppercase",
          }}
        >
          Access Denied
        </h1>
        <p style={{ marginTop: "1rem", fontSize: "1rem" }}>
          Possible reasons for access denial:
        </p>
        <ul
          style={{
            listStyle: "square",
            textAlign: "left",
            fontSize: "1rem",
            marginTop: "0.5rem",
            paddingLeft: "20px",
          }}
        >
          {reasons.map((reason, index) => (
            <li
              key={index}
              style={{
                marginBottom: "0.5rem",
              }}
            >
              {reason}
            </li>
          ))}
        </ul>
        <Link
          to="/"
          style={{
            marginTop: "1rem",
            fontSize: "1rem",
            background: "lightgray",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          Go to Home Page
        </Link>
      </div>
    </>
  );
};

export default AccessDenied;
