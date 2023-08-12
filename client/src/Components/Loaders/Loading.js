import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Loading.css";

const Loading = () => {
  const navigate = useNavigate();
  const redirectTime = 5;
  const [secondsRemaining, setSecondsRemaining] = useState(redirectTime);
  const [fact, setFact] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if (secondsRemaining === 0) {
      clearInterval(timer);
      navigate("/auth");
    }

    return () => {
      clearInterval(timer);
    };
  }, [secondsRemaining, navigate]);

  useEffect(() => {
    fetch("https://catfact.ninja/fact")
      .then((response) => response.json())
      .then((data) => setFact(data.fact))
      .catch((error) => console.error("Error fetching cat fact:", error));
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <h1 className="loading-text">Loading...</h1>
      {fact && (
        <p className="fact-message">
          <strong> Did you know? </strong>
          <br /> <i>{fact}</i>
        </p>
      )}

      <p className="redirect-message">
        If it takes more than {secondsRemaining} seconds, you will be redirected
        to the{" "}
        <span>
          <Link to={"/auth"}>
            {" "}
            <span
              style={{
                color: "#007bff" /* Blue color for links */,
                textDecoration: "underline" /* Underline the text */,
                cursor: "pointer" /* Show pointer cursor on hover */,
              }}
            >
              login
            </span>{" "}
          </Link>
        </span>
        page.
      </p>
    </div>
  );
};
export default Loading;
