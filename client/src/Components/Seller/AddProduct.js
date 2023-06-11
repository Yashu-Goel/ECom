import React, { useState } from "react";
import "./AddProduct.css";
import SellerNav from "./SellerNav";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");
  const [specialFeature, setSpecialFeature] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", {
      productName,
      productType,
      price,
      model,
      specialFeature,
    });
    // Clear form fields after submission
    setProductName("");
    setProductType("");
    setPrice("");
    setModel("");
    setSpecialFeature("");
  };

  return (
    <div className="ProductDetailOuterContainer">
      <SellerNav />

        <p className="ProductDetailHeading">Product Details: </p>
        <form
          className="ProductDetailMainContainer"
          onSubmit={handleFormSubmit}
        >
          <div className="form-group">
            <label>Product Name:</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Product Type:</label>
            <input
              type="text"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Model:</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Special Feature:</label>
            <input
              value={specialFeature}
              onChange={(e) => setSpecialFeature(e.target.value)}
            ></input>
          </div>
          <button type="submit">Add Product</button>
        </form>
    </div>
  );
};

export default AddProduct;
