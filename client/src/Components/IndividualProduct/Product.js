import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import "./Product.css";

const Product = () => {
  const [imageSrc, setImageSrc] = useState(
    require(`../TopSecHome/img_1/slider10Images/image1.webp`)
  );

  const addImage = (pic) => {
    setImageSrc(require(`../TopSecHome/img_1/slider10Images/${pic}`));
  };

  const { id } = useParams();
  const productDetails = {
    id: { id },
    name: "Perfume Da Lowda Mera Wood Flavour Brasil the silva santos Juinioh gauushy  hguahsj ",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam explicabo nesciunt consequuntur a eligendi ipsa ex rerum doloribus distinctio, ratione corrupti saepe ipsam commodi perferendis aspernatur expedita numquam dolores quisquam!",
    brand: "The Beardo Company",
    MRP: "2358",
    price: "1998",
    model: "Sandwood color with authentic colro",
    pics: [
      "image1.webp",
      "image2.webp",
      "image3.webp",
      "image4.webp",
      "image5.webp",
    ],
    category: "Home and Kitchen Appliances",
    ratings: 4,
    reviews: [{}, {}],
    sellerName: "Allen Benny",
    quantityOptions: 10,
  };

  function setClassName(index, pic) {
    const Img = document.querySelectorAll(".current");
    Img.forEach((items) => {
      items.classList.remove("active");
    });

    Img[index].classList.add("active");
    const mainImgae = document.getElementsByClassName("main-image");
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
  const quantityOptions = [...Array(productDetails.quantityOptions).keys()].map(
    (index) => (
      <option key={index} value={index + 1}>
        {index + 1}
      </option>
    )
  );
  const oos = {
    color: "#fff",
    backgroundColor: "#FF7F7F",
  };
  function addedToCart() {
    toast.success("Product added succesfully !", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2500,
      className: "toast-message",
    });
  }
  return (
    <>
      <Navbar />
      <div className="product-page">
        <div className="product-pics outer-divs">
          <div className="image-thums">
            {productDetails.pics.map((pic, index) => {
              return (
                <div className="inner-thumb-pics" key={index}>
                  <img
                    src={require(`../TopSecHome/img_1/slider10Images/${pic}`)}
                    alt=""
                    onMouseOver={() => setClassName(index, pic)}
                    className="current"
                  />
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
              <Link to={"#reviews"} className="total-reviews">
                {productDetails.reviews.length} ratings
              </Link>
            </div>

            <div className="product-cost">
              <div className="product-sellingPrice">
                &#8377;{productDetails.price}
              </div>
              <div className="product-costPrice">
                <p className="product-mrp">M.R.P.:&nbsp;{productDetails.MRP}</p>
                <div className="product-discount-percent">
                  -{calculateDiscount(productDetails.MRP, productDetails.price)}
                  %
                </div>
              </div>
              <div className="product-tax-details">Inclusive of all taxes</div>
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
                  <strong>Seller Name:-</strong> {productDetails.sellerName}
                </li>
                <li>
                  <strong>Description:-</strong> {productDetails.description}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="product-buy outer-divs">
          <div className="product-buy-div">
            {productDetails.quantityOptions !== 0 && (
              <>
                <h2 className="checking">Check for product Availabilty:-</h2>
                <input type="text" placeholder="Pincode" className="pincode" />
                <button className="pin-search">Search</button>
              </>
            )}
          </div>
          {productDetails.quantityOptions === 0 ? (
            <h1 className="oos">Out of stock</h1>
          ) : (
            <>
              <p className="shipping">Shipped in 2-3 working Days</p>
              <span className="capacity">Quantity:</span>
              <select>{quantityOptions}</select>
            </>
          )}
          <div className="cart-button">
            {productDetails.quantityOptions !== 0 && (
              <>
                <button className="add-to-cart" onClick={addedToCart}>
                  Add to Cart
                </button>
                <button>Buy now</button>
              </>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Product;
