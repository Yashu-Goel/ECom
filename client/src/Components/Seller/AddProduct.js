import React, { useState } from "react";
import "./AddProduct.css";
import SellerNav from "./SellerNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddProduct = () => {
  const API_BASE = "http://localhost:5000"; 
 const [selectedImage, setSelectedImage] = useState(null);
  const [ProductData, setProductData] = useState({
    name: "",
    type: "",
    price: "",
    model: "",
    special_feature: "",
  });
const handleImageChange = (e) => {
  const files = e.target.files;
  setSelectedImage(files);
};

const handleFormSubmit = async (e) => {
  e.preventDefault();

  const { name, type, price, model, special_feature } = ProductData;

  if ( !type || !price || !model) {
    toast.error("Fill All Details");
    return;
  }

  try {
    const sellerId = localStorage.getItem("_id");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("model", model);
    formData.append("special_feature", special_feature);
    formData.append("sellerId", sellerId);
    if(selectedImage.length>5)
    {
      toast.error("Maximum Images Limit: 5")
    }
    for (let i = 0; i < selectedImage.length; i++) {
      formData.append("productImages", selectedImage[i]); // 
    }

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(API_BASE + "/seller/product", formData, config);
    console.log(data);
    toast.success("Product added successfully");
  } catch (error) {
    toast.error("Error occurred while adding the product");
    console.log("Error: "+ error);
  }

  // Clear form fields after submission
  // setProductData({
  //   name: "",
  //   type: "",
  //   price: "",
  //   model: "",
  //   special_feature: "",
  // });
};


  return (
    <div className="ProductDetailOuterContainer">
      <SellerNav />

      <p className="ProductDetailHeading">Product Details:</p>
      <form className="ProductDetailMainContainer" onSubmit={handleFormSubmit}>
        <div className="seller-form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={ProductData.name}
            onChange={(e) =>
              setProductData({ ...ProductData, name: e.target.value })
            }
          />
        </div>
        <div className="seller-form-group">
          <label>Product Type:</label>
          <select
            value={ProductData.type}
            onChange={(e) =>
              setProductData({ ...ProductData, type: e.target.value })
            }
            id="cat-select"
          >
            <option value="">Select a type</option>
            <option value="electronics">Electronics</option>
            <option value="apparel-and-fashion">Apparel and Fashion</option>
            <option value="home-and-kitchen">
              Home and Kitchen Appliances
            </option>
            <option value="beauty-and-personal-care">
              Beauty and Personal Care
            </option>
            <option value="books-music-and-media">
              Books, Music, and Media
            </option>
            <option value="health-and-wellness">Health and Wellness</option>
            <option value="grocery-and-household-essentials">
              Grocery and Household Essentials
            </option>
            <option value="toys-and-games">Toys and Games</option>
            <option value="sports-and-outdoor">Sports and Outdoor</option>
          </select>
        </div>
        <div className="seller-form-group">
          <label>Price(₹):</label>
          <input
            type="text"
            value={ProductData.price}
            onChange={(e) =>
              setProductData({ ...ProductData, price: e.target.value })
            }
          />
        </div>
        <div className="seller-form-group">
          <label>Model:</label>
          <input
            type="text"
            value={ProductData.model}
            onChange={(e) =>
              setProductData({ ...ProductData, model: e.target.value })
            }
          />
        </div>
        <div className="seller-form-group">
          <label>Special Feature:</label>
          <input
            value={ProductData.special_feature}
            onChange={(e) =>
              setProductData({
                ...ProductData,
                special_feature: e.target.value,
              })
            }
          />
        </div>
        <div className="seller-form-group">
          <label>Product Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept=".jpg, .jpeg, .png"
            multiple
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
};

export default AddProduct;
