import React, { useState } from "react";
import "./AddProduct.css";
import SellerNav from "./SellerNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddProduct = () => {
  const API_BASE = "http://192.168.0.103:5000";
  const [selectedImages, setSelectedImages] = useState([]);
  const [ProductData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    MRP: "",
    model: "",
    description: "",
    brand: "",
    quantity: "",
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { name, category, price, MRP, model, description, brand, quantity } =
      ProductData;

    if (
      !name ||
      !category ||
      !price ||
      !MRP ||
      !model ||
      !description ||
      !brand ||
      !quantity
    ) {
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
      formData.append("quantity", quantity);
      formData.append("sellerId", sellerId);

      if (selectedImages.length > 5) {
        toast.error("Maximum Images Limit: 5");
        return;
      }

      const imageUploadPromises = selectedImages.map(async (image) => {
        const imageFormData = new FormData();
        imageFormData.append("file", image);
        const { data } = await axios.post(
          API_BASE + "/seller/get-upload-url",
          imageFormData
        );

        const imageUrl = data.signedUrl;
        await axios.put(imageUrl, image, {
          headers: {
            "Content-Type": image.type,
          },
        });

        return data.uniqueFilename;
      });

      const uploadedImageNames = await Promise.all(imageUploadPromises);
      const imageNamesArray = uploadedImageNames.map((imageName) => ({
        type: imageName,
      }));

      formData.append("imageName", JSON.stringify(imageNamesArray));

      console.log(JSON.stringify(imageNamesArray));
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log('OKOK');
      console.log(ProductData.category);
      const { product_data } = await axios.post(
        API_BASE + "/seller/product",
        formData,
        config
      );
      console.log(product_data);

      toast.success("Product added successfully");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Error occurred while adding the product");
      }
      console.log("Error: " + error);
    }
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

        <div className="seller-form-group">
          <label> Quantity:</label>
          <input
            value={ProductData.quantity}
            onChange={(e) =>
              setProductData({
                ...ProductData,
                quantity: e.target.value,
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
