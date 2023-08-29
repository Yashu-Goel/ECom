import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Product.css";

const Product = ({ product, onClose }) => {
  const { name, model, brand, category, imageName, price} = product;
  const [images, setImages] = useState([]);
  console.log(imageName);
console.log(product);
  useEffect(() => {
    setImages(imageName);
  }, [imageName]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    accessibility: true,
    arrow: true,
  };

  function getFileNameFromPath(path) {
    const parts = path.split("\\");
    return parts[parts.length - 1];
  }
console.log(images);
  return (
    <>
      <div className="ProductModalBackground"></div>
      <div className="product-modal">
        <div className="modal-content">
          <h2>Product Details</h2>

          
          <p>
            <span>Product Name:</span> {name}
          </p>
          <p>
            <span>Category:</span> {category}
          </p>
          <p>
            <span>Brand:</span> {brand}
          </p>
          <p>
            <span>Model:</span> {model}
          </p>
          <p>
            <span>Price:</span> ₹{price}
          </p>

          <button className="ProductModalButton" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
