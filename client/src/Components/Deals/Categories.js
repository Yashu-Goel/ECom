import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

const categoryData = [
  {
    name: "Men's Fashion",
    color: "#3498db",
    symbol: "👔",
    tags: ["Fashion", "Clothing", "Style"],
  },
  {
    name: "Women's Fashion",
    color: "#e74c3c",
    symbol: "👗",
    tags: ["Fashion", "Clothing", "Style"],
  },
  {
    name: "Children's Fashion",
    color: "#2ecc71",
    symbol: "👶",
    tags: ["Fashion", "Kids", "Clothing"],
  },
  {
    name: "Mobile Phones",
    color: "#f39c12",
    symbol: "📱",
    tags: ["Electronics", "Devices", "Technology"],
  },
  {
    name: "Laptops",
    color: "#9b59b6",
    symbol: "💻",
    tags: ["Electronics", "Devices", "Technology"],
  },
  {
    name: "Gaming",
    color: "#16a085",
    symbol: "🎮",
    tags: ["Entertainment", "Games", "Hobbies"],
  },
  {
    name: "Healthy Recipes",
    color: "#c0392b",
    symbol: "🥗",
    tags: ["Food", "Cooking", "Health"],
  },
  {
    name: "Outdoor Travel",
    color: "#2980b9",
    symbol: "🏞️",
    tags: ["Travel", "Outdoors", "Adventure"],
  },
  {
    name: "Indoor Travel",
    color: "#e67e22",
    symbol: "✈️",
    tags: ["Travel", "Adventure"],
  },
  {
    name: "Rock Music",
    color: "#8e44ad",
    symbol: "🎸",
    tags: ["Music", "Rock", "Genres"],
  },
  {
    name: "Home Decor",
    color: "#d35400",
    symbol: "🏠",
    tags: ["Home", "Decor", "Interior"],
  },
  {
    name: "Fitness & Workout",
    color: "#27ae60",
    symbol: "💪",
    tags: ["Health", "Fitness", "Exercise"],
  },
  {
    name: "Photography",
    color: "#9b59b6",
    symbol: "📸",
    tags: ["Hobbies", "Art", "Photographs"],
  },
  {
    name: "Pet Care",
    color: "#e74c3c",
    symbol: "🐾",
    tags: ["Pets", "Animals", "Care"],
  },
  {
    name: "DIY Crafts",
    color: "#e67e22",
    symbol: "✂️",
    tags: ["Hobbies", "Crafts", "Creative"],
  },
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
            to={`/category/${encodeURIComponent(category.name)}/${
              category.tags &&
              category.tags.map((tag) => encodeURIComponent(tag)).join(",")
            }`}
            className="category-link"
            style={{ backgroundColor: category.color || "#3498db" }}
          >
            <div className="category-symbol">
              <p>{category.symbol}</p>
              <p>{category.name}</p>
            </div>
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
