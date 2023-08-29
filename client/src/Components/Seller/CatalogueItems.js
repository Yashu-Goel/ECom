import React, {useState} from "react";
import "./CatalogueItems.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CatalogueItems = ({
  name,
  category,
  price,
  MRP,
  model,
  description,
  brand,
  pics, // Save
  quantity,
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true, 
    accessibility: true, 
    arrow: true
  };
  return (
    <>
      <div className="CatalogueOuter">
        <div className="CatalogueItemMainContainer">
          <div className="CatalogueItemImageContainer">
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
          <div className="CatalogueItemProductDetails">
            <p>
              Name: <span> {name} </span>
            </p>
          </div>
          <div className="CatalogueItemProductDetails">
            <p>
              Brand: <span> {brand} </span>
            </p>
          </div>
          <div className="CatalogueItemProductDetails">
            <p>
              Category:<span> {category} </span>
            </p>
          </div>
          <div className="CatalogueItemProductDetails">
            <p>
              Price: <span>{price} </span>
            </p>
          </div>
          <div className="CatalogueItemProductDetails">
            <p>
              MRP: <span>{MRP} </span>
            </p>
          </div>
          <div className="CatalogueItemProductDetails">
            <p>
              Model:<span> {model} </span>
            </p>
          </div>
          <div className="CatalogueItemProductDetails">
            <p>
              Quantity:<span> {quantity} </span>
            </p>
          </div>
          <div className="CatalogueItemProductDetails">
            <p>
              Description: <span>{description}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogueItems;
