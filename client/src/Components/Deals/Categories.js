import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Categories.css"; // Import your CSS file for styling

const categoryData = [
  { name: "Men's Fashion", color: "#3498db" },
  { name: "Women's Fashion", color: "#e74c3c" },
  { name: "Children's Fashion", color: "#2ecc71" },
  { name: "Mobile Phones", color: "#f39c12" },
  { name: "Laptops", color: "#9b59b6" },
  { name: "Gaming", color: "#16a085" },
  { name: "Healthy Recipes", color: "#c0392b" },
  { name: "Outdoor Travel", color: "#2980b9" },
  { name: "Indoor Travel", color: "#e67e22" },
  { name: "Rock Music", color: "#8e44ad" },
  { name: "Home Decor", color: "#d35400" },
  { name: "Fitness & Workout", color: "#27ae60" },
  { name: "Photography", color: "#9b59b6" },
  { name: "Pet Care", color: "#e74c3c" },
  { name: "DIY Crafts", color: "#e67e22" },
  // Add more categories...
];

const Categories = () => {
  const itemsPerLoad = 3;
  const initialLoadItems = 11;
  const [visibleItems, setVisibleItems] = useState(initialLoadItems);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [visibleItems]);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleItems(
        Math.min(visibleItems + itemsPerLoad, categoryData.length)
      );
    }, 500);
  };

  return (
    <div className="categories-container">
      <h1>Explore all Categories</h1>
      <div className="categories-grid">
        {categoryData.slice(0, visibleItems).map((category, index) => (
          <Link
            key={index}
            to={`category/${category.link}`}
            className="category-link"
            style={{ backgroundColor: category.color || "#3498db" }}
          >
            {category.name}
          </Link>
        ))}
      </div>
      {isLoading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        visibleItems < categoryData.length && (
          <button className="load-more-button" onClick={loadMore}>
            Load More
          </button>
        )
      )}
    </div>
  );
};

export default Categories;
