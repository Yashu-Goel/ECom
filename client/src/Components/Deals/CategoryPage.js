// ProductsPage.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE } from "../functions/functions";
import axios from "axios";

import "./CategoryPage.css";

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.min(Math.max(rating, 0), totalStars);

  return (
    <div className="categorypage-star-rating">
      {Array.from({ length: totalStars }).map((_, index) => (
        <span
          key={index}
          className={`categorypage-star ${
            index < filledStars ? "categorypage-filled" : "categorypage-empty"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const CategoryPage = () => {
  const { categoryName, tags } = useParams();
  const [sortType, setSortType] = useState("Sort By");
  const [searchTerm, setSearchTerm] = useState("");
  const [product, setProduct] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          API_BASE + "/get/getCategoryDetails",
          {
            tags: tags.split(","),
          }
        );
        setProduct(response.data);
        setFilterProduct(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [categoryName, tags]);

  useEffect(() => {
    const filteredAndSortedProducts = product
      .filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase()) ||
          product.brand
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase())
      )
      .sort((a, b) => {
        if (sortType === "Price") {
          return a.price - b.price;
        } else if (sortType === "Brand Name") {
          return a.name.localeCompare(b.name);
        } else if (sortType === "Rating") {
          return a.rating - b.rating;
        } else {
          return;
        }
      });

    setFilterProduct(filteredAndSortedProducts);
  }, [searchTerm, sortType]);

  return (
    <div className="categorypage-outer">
      <h1 className="categorypage-outer-h1">{categoryName}</h1>
      <div className="categorypage-wrapper-sort">
        <div className="categorypage-dropdown-sort">
          <select
            className="categorypage-dropdownBtnSort"
            onChange={(e) => {
              setSortType(e.target.value);
            }}
          >
            <option value="Sort By">Sort By</option>
            <option value="Price">Price</option>
            <option value="Rating">Rating</option>
            <option value="Brand Name">Brand Name</option>
          </select>
        </div>
        <input
          type="search"
          className="categorypage-filter-search"
          placeholder="Search "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          id="categorypage-clearBtn"
          onClick={() => {
            setSearchTerm("");
          }}
        >
          Reset
        </button>
      </div>
      <div className="categorypage-main">
        <ul className="categorypage-cards">
          {filterProduct.length > 0 ? (
            <>
              {filterProduct.map((product, index) => {
                return (
                  <li className="categorypage-cards_item" key={index}>
                    <div className="categorypage-card">
                      <div class="categorypage-bestSellerRgt">
                        {product.brand}
                      </div>
                      <div className="categorypage-card_image">
                        <img src={product.imageUrl} alt={product.title} />
                      </div>
                      <div className="categorypage-card_content">
                        <div className="categorypage-price_title_sec">
                          <h2 className="categorypage-card_title">
                            {product.name}
                          </h2>
                          <div className="categorypage-inner-price-details">
                            <StarRating rating={product.rating} />
                            <h2 className="categorypage-card_title categorypage-price-details">
                              ₹ {product.price}
                            </h2>
                          </div>
                        </div>
                        <p className="categorypage-card_text">
                          {product.description.length > 100
                            ? product.description.substring(0, 200) + "..."
                            : product.description}
                        </p>

                        <Link
                          className="categorypage-buynow-btn"
                          to={`/product/${product._id}`}
                        >
                          Buy Now
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </>
          ) : (
            <h1
              style={{
                textAlign: "center !important",
                margin: "20px !important",
              }}
            >
              Oops! We couldn't find any products matching your search criteria.
              😢
            </h1>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CategoryPage;
