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
  return (
    <div className="CatalogueItemMainContainer">
      <div className="CatalogueItemImageContainer">
        <img src={imageUrl} alt="Product" />
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
