import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import ImageSlider from "../TopSecHome/ImageSlider";
import firstSlider from "../dummyDatas/firstSlider.json";
import "./Product.css";
import { UserState } from "../Context/UserProvider";
import CartModal from "../Modal/CartModal";
import { addedToCart } from "../functions/functions";
import { API_BASE } from "../functions/functions";
import { calculateDiscount } from "./function";
import { formatDistanceToNow } from "date-fns";
import { AWS_LINK } from "./function";
import { toast } from "react-toastify";
import { toIndianCurrency } from "../OrderConfirmationPage/function";

export const Product = () => {
  const { id } = useParams();
  const { user, cart, setCart } = UserState();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [productDetails, setProductDetails] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/review/${id}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [id]);

  useEffect(() => {
    setLoading(true);
    const getProductDetails = async () => {
      try {
        const response = await axios.get(
          API_BASE + `/get/getProductDetails/${id}`
        );
        setProductDetails(response.data);
        setImageSrc(response.data && response.data.imageName[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getProductDetails();
    setLoading(false);
  }, [id]);

  function setClassName(index, pic) {
    const Img = document.querySelectorAll(".current");
    Img.forEach((items) => {
      items.classList.remove("active");
    });

    Img[index].classList.add("active");
    setImageSrc(pic);
  }

  const increment = () => {
    if (count < productDetails.quantity) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <>
      {showModal && <CartModal closeModal={() => setShowModal(false)} />}
      {!productDetails ? (
        <div className="loading-modal">
          <div className="loading-spinner"></div>
          <p>Loading ...</p>
        </div>
      ) : (
        !loading && (
          <div className="product-container">
            <div className="product-page">
              <div className="product-pics outer-divs">
                <div className="image-thums">
                  {productDetails?.imageName &&
                    productDetails?.imageName.map((pic, index) => {
                      return (
                        <div className="inner-thumb-pics" key={index}>
                          {
                            <img
                              src={`${AWS_LINK}/${pic}`}
                              alt="pic"
                              onMouseOver={() => setClassName(index, pic)}
                              className="current"
                            />
                          }
                        </div>
                      );
                    })}
                </div>

                <div className="main-image">
                  {productDetails.imageName &&
                    productDetails.imageName.length > 0 && (
                      <img src={`${AWS_LINK}/${imageSrc}`} alt="main-pic" />
                    )}
                </div>
              </div>

              <div className="product-desc outer-divs">
                <div>
                  <div className="product-name">
                    <h2>{productDetails.name}</h2>
                  </div>

                  <Link to={"#"} className="product-brand">
                    Visit the {productDetails.brand} Store
                  </Link>

                  <div className="ratings">
                    {productDetails.ratings ? (
                      <>
                        <strong>{productDetails.ratings}.0</strong> &nbsp;
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            style={
                              index < productDetails.ratings
                                ? {
                                    color: "orange",
                                  }
                                : null
                            }
                          >
                            &#9733;
                          </span>
                        ))}
                        &nbsp;|&nbsp;
                        <Link
                          to={`/product/${productDetails._id}`}
                          className="total-reviews"
                        >
                          {reviews && reviews.length} ratings
                        </Link>
                      </>
                    ) : (
                      <p>No ratings yet</p>
                    )}
                  </div>

                  <div className="product-cost">
                    <div className="product-sellingPrice">
                      {toIndianCurrency(productDetails?.price)}
                    </div>
                    <div className="product-costPrice">
                      <p className="product-mrp">
                        M.R.P.:&nbsp;{toIndianCurrency(productDetails?.MRP)}
                      </p>
                      <div className="product-discount-percent">
                        -
                        {calculateDiscount(
                          productDetails.MRP,
                          productDetails.price
                        )}
                        %
                      </div>
                    </div>
                    <div className="product-tax-details">
                      Inclusive of all taxes
                    </div>
                  </div>

                  <div className="product-decription">
                    <h3 className="about-this">About this item</h3>
                    <ul className="product-details">
                      <li>
                        <strong>Name:-</strong>{" "}
                        {productDetails && productDetails.name}
                      </li>
                      <li>
                        <strong>Model:-</strong>{" "}
                        {productDetails && productDetails.model}
                      </li>
                      <li>
                        <strong>Brand:-</strong>{" "}
                        {productDetails && productDetails.brand}
                      </li>
                      <li>
                        <strong>Category:-</strong>{" "}
                        {productDetails && productDetails.category}
                      </li>
                      <li>
                        <strong>Seller Name:-</strong>{" "}
                        {productDetails &&
                          productDetails.sellerId &&
                          productDetails.sellerId.name}
                      </li>
                      <li>
                        <strong>Description:-</strong>{" "}
                        {productDetails && productDetails.description}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="product-buy outer-divs">
                <div className="product-buy-div">
                  {productDetails.quantityOptions !== 0 && (
                    <div>
                      <h2 className="checking">
                        Check for product Availabilty:-
                      </h2>
                      <div className="inner-heading">
                        <input
                          type="text"
                          placeholder="eg: 110099"
                          className="pincode"
                        />
                        <button className="pin-search">Search</button>
                      </div>
                    </div>
                  )}
                </div>
                {productDetails.quantityOptions === 0 ? (
                  <h1 className="oos">Out of stock</h1>
                ) : (
                  <>
                    <p className="shipping">Shipped in 2-3 working Days</p>
                    <div className="outer-quantity">
                      <span className="capacity">Quantity:</span>
                      <div className="quantity">
                        <button className="counter-button" onClick={decrement}>
                          -
                        </button>
                        <span className="count">{count}</span>
                        <button className="counter-button" onClick={increment}>
                          +
                        </button>
                      </div>
                    </div>
                  </>
                )}
                <div className="cart-button">
                  {productDetails.quantityOptions !== 0 && (
                    <>
                      <button
                        className="add-to-cart"
                        onClick={(e) => {
                          addedToCart(
                            productDetails._id,
                            count,
                            user,
                            cart,
                            setCart
                          );
                        }}
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => {
                          if (!user) {
                            toast.error("Please login !", {
                              position: toast.POSITION.BOTTOM_CENTER,
                              autoClose: 2500,
                              className: "toast-message",
                            });
                            return;
                          }
                          setShowModal(true);
                        }}
                      >
                        Buy now
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div id="reviews" className="product-reviews">
              {!reviews.length ? (
                <h1>No reviews yet</h1>
              ) : (
                <div>
                  <h1>Top reviews</h1>
                  <div className="review-container">
                    {reviews.map((review) => (
                      <div className="review-box" key={review._id}>
                        <div className="review-icon">
                          <div className="user-info">
                            <i className="fa fa-user" aria-hidden="true"></i>
                            &nbsp;
                            <strong>{review.user.name}</strong>
                          </div>

                          <div className="rating-stars">
                            {[...Array(5)].map((_, index) => (
                              <strong
                                key={index}
                                style={
                                  index < review.stars ? { color: "red" } : null
                                }
                              >
                                &#9733;
                              </strong>
                            ))}
                          </div>

                          <p className="review-message">
                            {review.reviewMessage}
                          </p>
                          <p className="review-date">
                            Posted:{" "}
                            {formatDistanceToNow(
                              new Date(review.dateUploaded),
                              { addSuffix: true }
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <ImageSlider
              slider={firstSlider}
              loop={false}
              text={true}
              className="image-slider"
            />
          </div>
        )
      )}
    </>
  );
};
