import React from "react";
import "./StarRating.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ value, onChange }) => {
  const stars = Array(5).fill(0);

  const handleStarClick = (newValue) => {
    onChange(newValue);
  };
  let ratingText = "";
  let textColor = "";

  if (value === 5) {
    ratingText = "Excellent";
    textColor = "#f8ce0b";
  } else if (value === 4) {
    ratingText = "Good";
    textColor = "green";
  } else if (value === 3) {
    ratingText = "Average";
    textColor = "orange";
  } else if (value === 2) {
    ratingText = "Unsatisfied";
    textColor = "red";
  } else if (value === 1) {
    ratingText = "Poor";
    textColor = "#9C4545";
  }

  const textStyle = {
    color: textColor,
  };

  return (
    <div className="star-rating">
      {stars.map((_, index) => {
        const starValue = index + 1;
        let starIcon;

        if (value >= starValue) {
          starIcon = <FaStar onClick={() => handleStarClick(starValue)} />;
        } else if (value >= starValue - 0.5) {
          starIcon = (
            <FaStarHalfAlt onClick={() => handleStarClick(starValue - 0.5)} />
          );
        } else {
          starIcon = <FaRegStar onClick={() => handleStarClick(starValue)} />;
        }

        return (
          <span key={index} style={textStyle}>
            {starIcon}
          </span>
        );
      })}
      <p style={textStyle}>{ratingText}</p>
    </div>
  );
};

export default StarRating;
