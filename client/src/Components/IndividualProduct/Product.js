import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import ImageSlider from "../TopSecHome/ImageSlider";
import firstSlider from "../dummyDatas/firstSlider.json";
import "./Product.css";
import { UserState } from "../Context/UserProvider";
import CartModal from "../Modal/CartModal";
import { addedToCart } from "../functions/functions";
import { API_BASE } from "../functions/functions";

export const Product = () => {
  const { user, cart, setCart } = UserState();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [productDetails, setProductDetails] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [pic, setPic] = useState([]);

  // useEffect(() => {
  //   setLoading(true);
  //   const getProductDetails = async () => {
  //     try {
  //       const response = await axios.get(
  //         API_BASE + `/get/getProductDetails/${id}`
  //       );
  //       setProductDetails(response.data);
  //       setPic(response.data.pics);
  //       console.log("OKOK: "+pic);        
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   // getProductDetails();
  //   setLoading(false);

  // }, []);

  const openModal = () => {
    setShowModal(true);
  };
  function getFileNameFromPath(path) {
    const parts = path.split("\\");
    return parts[parts.length - 1];
  }
  function convertFilePathToURL(filePath) {
    const normalizedPath = filePath.replace(/\\/g, "/");
    console.log("image here", normalizedPath);
    return normalizedPath;
  }
  const closeModal = () => {
    setShowModal(false);
  };
  //error

  const addImage = (pic) => {
    setImageSrc(
      process.env.PUBLIC_URL + "/uploads/" + getFileNameFromPath(pic)
    );
  };

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    // setTimeout(() => {
    const getProductDetails = async () => {
      try {
        const response = await axios.get(
          API_BASE + `/get/getProductDetails/${id}`
        );
        setProductDetails(response.data);
        setPic(response.data.pics); 
      } catch (error) {
        console.log(error);
      }
    };
    getProductDetails();
    setLoading(false);
    // }, 2500);
  }, []);

  function setClassName(index, pic) {
    const Img = document.querySelectorAll(".current");
    Img.forEach((items) => {
      items.classList.remove("active");
    });

    Img[index].classList.add("active");
    addImage(pic);
  }
  function calculateDiscount(mrp, sellingPrice) {
    const discountAmount = mrp - sellingPrice;
    const discountPercentage = (discountAmount / mrp) * 100;
    return Math.floor(discountPercentage);
  }
  const starStyle = {
    color: "orange",
  };

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
  // const oos = {
  //   color: "#fff",
  //   backgroundColor: "#FF7F7F",
  // };
  return (
    <>
      {!productDetails ? (
        <div className="loading-modal">
          <div className="loading-spinner"></div>
          <p>Loading ...</p>
        </div>
      ) : (
        <div className="product-container">
          <Navbar />
          <div className="product-page">
            <div className="product-pics outer-divs">
              <div className="image-thums">
                {productDetails.pics &&
                  productDetails.pics.map((pic, index) => {
                    return (
                      <div className="inner-thumb-pics" key={index}>
                        {console.log("pic: " + pic)}
                        {
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/uploads/" +
                              getFileNameFromPath(pic)
                            }
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
                <img src={imageSrc} alt="first" />
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
                  <strong>{productDetails.ratings}.0</strong> &nbsp;
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      style={index < productDetails.ratings ? starStyle : null}
                    >
                      &#9733;
                    </span>
                  ))}
                  &nbsp;|&nbsp;
                  {/* coorevt the below to Link */}
                  <Link to={""} className="total-reviews">
                    {Object.keys(productDetails.reviews).length} ratings
                  </Link>
                </div>

                <div className="product-cost">
                  <div className="product-sellingPrice">
                    &#8377;{productDetails.price}
                  </div>
                  <div className="product-costPrice">
                    <p className="product-mrp">
                      M.R.P.:&nbsp;{productDetails.MRP}
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
                      <strong>Name:-</strong> {productDetails.name}
                    </li>
                    <li>
                      <strong>Model:-</strong> {productDetails.model}
                    </li>
                    <li>
                      <strong>Brand:-</strong> {productDetails.brand}
                    </li>
                    <li>
                      <strong>Category:-</strong> {productDetails.category}
                    </li>
                    <li>
                      <strong>Seller Name:-</strong> {productDetails.sellerId}
                    </li>
                    <li>
                      <strong>Description:-</strong>{" "}
                      {productDetails.description}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="product-buy outer-divs">
              <div className="product-buy-div">
                {productDetails.quantityOptions !== 0 && (
                  <>
                    <h2 className="checking">
                      Check for product Availabilty:-
                    </h2>
                    <input
                      type="text"
                      placeholder="Pincode"
                      className="pincode"
                    />
                    <button className="pin-search">Search</button>
                  </>
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
                    <button onClick={openModal}>Buy now</button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="product-reviews">
            {!Object.keys(productDetails.reviews).length ? (
              <h1>No reviews yet</h1>
            ) : (
              <h1>Top reviews</h1>
            )}
            <div>
              {Object.entries(productDetails.reviews).forEach((reviews) => {
                console.log(reviews);
                return (
                  <div className="review-box">
                    <div className="review-icon">
                      <div>
                        {" "}
                        <i class="fa fa-user" aria-hidden="true"></i>&nbsp;
                        {/* <strong>{reviews.name}</strong> */}
                      </div>

                      {[...Array(5)].map((_, index) => (
                        <strong
                          key={index}
                          style={
                            index < reviews.rating ? { color: "red" } : null
                          }
                        >
                          &#9733;
                        </strong>
                      ))}

                      <p>{reviews.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <ImageSlider
            slider={firstSlider}
            loop={false}
            text={true}
            className="image-slider"
          />
          <ToastContainer />
        </div>
      )}
    </>
  );
};
