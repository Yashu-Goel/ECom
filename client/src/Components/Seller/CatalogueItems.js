import React from "react";
import "./CatalogueItems.css";


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

  const parts = pics.split("\\");
  const fileName = parts[parts.length - 1];
  console.log(fileName);
  console.log(pics);
  return (
    <div className="CatalogueOuter">
      
      <div className="CatalogueItemMainContainer">
        <div className="CatalogueItemImageContainer">
          <img
            src={process.env.PUBLIC_URL + "/uploads/" + fileName}
            alt={name}
          />
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
