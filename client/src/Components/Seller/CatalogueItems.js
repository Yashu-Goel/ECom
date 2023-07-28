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
    <div className="CatalogueOuter">
      <h1>Catalogue</h1>
      <div className="CatalogueItemMainContainer">
        <div className="CatalogueItemImageContainer">
          <img
            src={process.env.PUBLIC_URL + "/uploads/" + fileName}
            alt={name}
          />
        </div>
        <div className="CatalogueItemProductDetails">
          <p>
            Product Name: <span> {name} </span>
          </p>
        </div>
        <div className="CatalogueItemProductDetails">
          <p>
            Product Type:<span> {type} </span>
          </p>
        </div>
        <div className="CatalogueItemProductDetails">
          <p>
            Product Price: <span>{price} </span>
          </p>
        </div>
        <div className="CatalogueItemProductDetails">
          <p>
            Product Model:<span> {model} </span>
          </p>
        </div>
        <div className="CatalogueItemProductDetails">
          <p>
            Special Feature: <span>{special_feature}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CatalogueItems;
