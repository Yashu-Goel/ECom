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
}) => {

  const parts = pics.split("\\");
  const fileName = parts[parts.length - 1];
  console.log(fileName);
  console.log(pics);
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
            Product Category:<span> {category} </span>
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
            Description: <span>{description}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CatalogueItems;
