import React from "react";
import "./CatalogueItems.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CatalogueItems = ({
  name,
  category,
  price,
  MRP,
  model,
  description,
  brand,
  pics, // Save
  quantity
}) => {

 
  
  console.log("pics: "+pics);
  return (
    <div className="CatalogueOuter">
      <div className="CatalogueItemMainContainer">
        <div className="CatalogueItemImageContainer">
          <Carousel
        className="coursel"
        infiniteLoop
        useKeyboardArrows={true}
        autoPlay="true"
        interval="5000"
        showThumbs={false}
        showStatus={false}
      >
            {pics.map((pic, index) => (
              <div key={index}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/uploads/" +
                    pic
                  }
                  alt={name}
                />
              </div>
            ))}
          </Carousel>
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
  );
};

export default CatalogueItems;
