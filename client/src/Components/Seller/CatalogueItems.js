import React from "react";
import "./CatalogueItems.css";


const CatalogueItems = ({
  name,
  type,
  price,
  model,
  special_feature,
  imageUrl,
}) => {
const parts = imageUrl.split("\\");
const fileName = parts[parts.length - 1];
console.log(fileName);
  return (
    <div className="CatalogueItemMainContainer">
      <div className="CatalogueItemImageContainer">
        <img
          src={
            process.env.PUBLIC_URL +
            "/uploads/"+ fileName
          }
          alt={name}
        />
      </div>
      <div className="CatalogueItemProductDetails">
        <p>Product Name: {name}</p>
      </div>
      <div className="CatalogueItemProductDetails">
        <p>Product Type: {type}</p>
      </div>
      <div className="CatalogueItemProductDetails">
        <p>Product Price: {price}</p>
      </div>
      <div className="CatalogueItemProductDetails">
        <p>Product Model: {model}</p>
      </div>
      <div className="CatalogueItemProductDetails">
        <p>Special Feature: {special_feature}</p>
      </div>
    </div>
  );
};

export default CatalogueItems;
