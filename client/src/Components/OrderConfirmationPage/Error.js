import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
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
        <Link to="/" style={{ marginTop: "1rem", fontSize: "1rem" }}>
          Go to Home Page
        </Link>
      </div>
    </>
  );
};

export default Error;
