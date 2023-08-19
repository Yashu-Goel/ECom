import React from "react";
import "./StarRating.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ value, onChange }) => {
  const stars = Array(5).fill(0);

  const handleStarClick = (newValue) => {
    onChange(newValue);
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

        return <span key={index}>{starIcon}</span>;
      })}
    </div>
  );
};

export default StarRating;
