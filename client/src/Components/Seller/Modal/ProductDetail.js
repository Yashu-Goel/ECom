import React from "react";
import "./ProductDetail.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = ({
  name,
  category,
  price,
  MRP,
  model,
  description,
  brand,
  pics,
  quantity,
  onClose,
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    accessibility: true,
    arrow: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="ProductDetailDimBackground"></div>
      <div className="ProductDetailModalOuter">
        <div className="ProductDetailModalMainContainer">
          <div className="ProductImage">
            <Slider {...settings}>
              {pics.map((pic, index) => (
                <div key={index}>
                  <img
                    src={`${process.env.REACT_APP_AWS_LINK}${pic}`}
                    alt={name}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="ProductDataItems">
            <div className="ProductDetails">
              <p>
                <b> Name: </b>
                <span>{name}</span>
              </p>
              <p>
                <b>Category: </b>
                <span>{category}</span>
              </p>
              <p>
                <b>Brand:</b>
                <span> {brand}</span>
              </p>
              <p>
                <b>Model:</b> <span>{model}</span>
              </p>
              <p>
                <b>MRP: </b>
                <span>₹ {MRP}</span>
              </p>
              <p>
                <b>Price:</b>
                <span> ₹ {price}</span>
              </p>
            </div>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
