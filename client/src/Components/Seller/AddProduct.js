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
  category: "",
  price: "",
  MRP: "",
  model: "",
  description: "",
  brand: "",
  rating: "",
  // reviews: [], 
});

const handleReviewChange = (index, field, value) => {
  // Create a copy of the current reviews array to avoid directly mutating state
  const updatedReviews = [...ProductData.reviews];
  // Update the specific review field based on the provided index and field
  updatedReviews[index][field] = value;
  // Update the ProductData state with the new reviews array
  setProductData({ ...ProductData, reviews: updatedReviews });
};

const handleRemoveReview = (index) => {
  const updatedReviews = [...ProductData.reviews];
  updatedReviews.splice(index, 1);
  setProductData({ ...ProductData, reviews: updatedReviews });
};

const handleAddReview = () => {
  // Create a copy of the current reviews array to avoid directly mutating state
  const updatedReviews = [...ProductData.reviews];
  // Add an empty review object to the array
  updatedReviews.push({ name: "", rating: 0, message: "" });
  // Update the ProductData state with the new reviews array
  setProductData({ ...ProductData, reviews: updatedReviews });
};

const handleImageChange = (e) => {
  const files = e.target.files;
  setSelectedImage(files);
};

const handleFormSubmit = async (e) => {
  e.preventDefault();

  const {
    name,
    category,
    price,
    MRP,
    model,
    description,
    brand,
    // rating,
    // reviews,
  } = ProductData;

  if (!category || !price || !model || !MRP) {
    toast.error("Fill All Details");
    return;
  }

  try {
    const sellerId = localStorage.getItem("_id");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("MRP", MRP);
    formData.append("model", model);
    formData.append("description", description);
    formData.append("brand", brand);
    // formData.append("rating", rating);
    // formData.append("reviews", JSON.stringify(reviews)); // Convert reviews array to JSON string
    formData.append("sellerId", sellerId);
    if (selectedImage.length > 5) {
      toast.error("Maximum Images Limit: 5");
      return;
    }
    for (let i = 0; i < selectedImage.length; i++) {
      formData.append("productImages", selectedImage[i]);
    }

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(API_BASE + "/product", formData, config);
    console.log(data);
    toast.success("Product added successfully");
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    } else {
      toast.error("Error occurred while adding the product");
    }
    console.log("Error: " + error);
  }

  // Clear form fields after submission
  // setProductData({
  //   name: "",
  //   category: "",
  //   price: "",
  //   MRP: "",
  //   model: "",
  //   description: "",
  //   brand: "",
  //   rating: "",
  //   reviews: [], // Reset reviews after submission
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
          <label>Product Category:</label>
          <select
            value={ProductData.category}
            onChange={(e) =>
              setProductData({ ...ProductData, category: e.target.value })
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
          <label>MRP(₹):</label>
          <input
            type="text"
            value={ProductData.MRP}
            onChange={(e) =>
              setProductData({ ...ProductData, MRP: e.target.value })
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
          <label> Description:</label>
          <input
            value={ProductData.description}
            onChange={(e) =>
              setProductData({
                ...ProductData,
                description: e.target.value,
              })
            }
          />
        </div>

        <div className="seller-form-group">
          <label> Brand:</label>
          <input
            value={ProductData.brand}
            onChange={(e) =>
              setProductData({
                ...ProductData,
                brand: e.target.value,
              })
            }
          />
        </div>

        {/* <div className="seller-form-group">
          <label>Product Reviews:</label>
          {ProductData.reviews.map((review, index) => (
            <div key={index}>
              <input
                type="text"
                value={review.name}
                onChange={(e) =>
                  handleReviewChange(index, "name", e.target.value)
                }
                placeholder="Name"
              />
              <input
                type="number"
                value={review.rating}
                onChange={(e) =>
                  handleReviewChange(index, "rating", e.target.value)
                }
                placeholder="Rating"
              />
              <input
                type="text"
                value={review.message}
                onChange={(e) =>
                  handleReviewChange(index, "message", e.target.value)
                }
                placeholder="Message"
              />
              <button onClick={() => handleRemoveReview(index)}>Remove</button>
            </div>
          ))}
          <button onClick={handleAddReview}>Add Review</button>
        </div> */}

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
