// src/components/ProductsPage.js
import React from "react";
import { Link } from "react-router-dom";
import "./DealsPage.css";

const DealsPage = () => {
  // Sample data for products
  const products = [
    {
      id: 1,
      name: "Mobile Phones and Accessories",
      offer: "66% off",
      category: "Electronics",
      image: "slider1.jpg",
    },
    {
      id: 2,
      name: "Kitchen Appliances and Grinders",
      offer: "12% off",
      category: "Kitchen Appliances",
      image: "slider2.jpg",
    },
    {
      id: 3,
      name: "Earbuds and accessories",
      offer: "50% off",
      category: "gadgets",
      image: "slider3.jpg",
    },
    {
      id: 4,
      name: "Premium shoes",
      offer: "33% off",
      category: "Shoes",
      image: "slider4.jpg",
    },
    {
      id: 5,
      name: "Micromax and Iphones",
      offer: "8% off",
      category: "Electronics",
      image: "slider5.jpg",
    },
    {
      id: 6,
      name: "Kids wear",
      offer: "66% off",
      category: "Apparel",
      image: "slider6.jpg",
    },
    {
      id: 7,
      name: "Desktop Accessories",
      offer: "13% off",
      category: "Gadgets",
      image: "slider7.jpg",
    },
    {
      id: 8,
      name: "Cameras and DSLR",
      offer: "22% off",
      category: "Camera",
      image: "slider8.jpg",
    },
    {
      id: 9,
      name: "Pericardin and Parkers",
      offer: "75% off",
      category: "Stationary",
      image: "slider9.jpg",
    },
    {
      id: 1,
      name: "Mobile Phones and Accessories",
      offer: "66% off",
      category: "Electronics",
      image: "slider1.jpg",
    },
    {
      id: 2,
      name: "Kitchen Appliances and Grinders",
      offer: "12% off",
      category: "Kitchen Appliances",
      image: "slider2.jpg",
    },
    {
      id: 3,
      name: "Earbuds and accessories",
      offer: "50% off",
      category: "gadgets",
      image: "slider3.jpg",
    },
    {
      id: 4,
      name: "Premium shoes",
      offer: "33% off",
      category: "Shoes",
      image: "slider4.jpg",
    },
    {
      id: 5,
      name: "Micromax and Iphones",
      offer: "8% off",
      category: "Electronics",
      image: "slider5.jpg",
    },
    {
      id: 6,
      name: "Kids wear",
      offer: "66% off",
      category: "Apparel",
      image: "slider6.jpg",
    },
    {
      id: 7,
      name: "Desktop Accessories",
      offer: "13% off",
      category: "Gadgets",
      image: "slider7.jpg",
    },
    {
      id: 8,
      name: "Cameras and DSLR",
      offer: "22% off",
      category: "Camera",
      image: "slider8.jpg",
    },
    {
      id: 9,
      name: "Pericardin and Parkers",
      offer: "75% off",
      category: "Stationary",
      image: "slider9.jpg",
    },
    {
      id: 1,
      name: "Mobile Phones and Accessories",
      offer: "66% off",
      category: "Electronics",
      image: "slider1.jpg",
    },
    {
      id: 2,
      name: "Kitchen Appliances and Grinders",
      offer: "12% off",
      category: "Kitchen Appliances",
      image: "slider2.jpg",
    },
    {
      id: 3,
      name: "Earbuds and accessories",
      offer: "50% off",
      category: "gadgets",
      image: "slider3.jpg",
    },
    {
      id: 4,
      name: "Premium shoes",
      offer: "33% off",
      category: "Shoes",
      image: "slider4.jpg",
    },
    {
      id: 5,
      name: "Micromax and Iphones",
      offer: "8% off",
      category: "Electronics",
      image: "slider5.jpg",
    },
    {
      id: 6,
      name: "Kids wear",
      offer: "66% off",
      category: "Apparel",
      image: "slider6.jpg",
    },
    {
      id: 7,
      name: "Desktop Accessories",
      offer: "13% off",
      category: "Gadgets",
      image: "slider7.jpg",
    },
    {
      id: 8,
      name: "Cameras and DSLR",
      offer: "22% off",
      category: "Camera",
      image: "slider8.jpg",
    },
    {
      id: 9,
      name: "Pericardin and Parkers",
      offer: "75% off",
      category: "Stationary",
      image: "slider9.jpg",
    },
    {
      id: 1,
      name: "Mobile Phones and Accessories",
      offer: "66% off",
      category: "Electronics",
      image: "slider1.jpg",
    },
    {
      id: 2,
      name: "Kitchen Appliances and Grinders",
      offer: "12% off",
      category: "Kitchen Appliances",
      image: "slider2.jpg",
    },
    {
      id: 3,
      name: "Earbuds and accessories",
      offer: "50% off",
      category: "gadgets",
      image: "slider3.jpg",
    },
    {
      id: 4,
      name: "Premium shoes",
      offer: "33% off",
      category: "Shoes",
      image: "slider4.jpg",
    },
    {
      id: 5,
      name: "Micromax and Iphones",
      offer: "8% off",
      category: "Electronics",
      image: "slider5.jpg",
    },
    {
      id: 6,
      name: "Kids wear",
      offer: "66% off",
      category: "Apparel",
      image: "slider6.jpg",
    },
    {
      id: 7,
      name: "Desktop Accessories",
      offer: "13% off",
      category: "Gadgets",
      image: "slider7.jpg",
    },
    {
      id: 8,
      name: "Cameras and DSLR",
      offer: "22% off",
      category: "Camera",
      image: "slider8.jpg",
    },
    {
      id: 9,
      name: "Pericardin and Parkers",
      offer: "75% off",
      category: "Stationary",
      image: "slider9.jpg",
    },
    // Add more product data here...
  ];

  return (
    <>
      <div className="products-page">
        <h1 className="deals-page-header">Today's Deals</h1>
        {/* <div className="filter-container">Filter options go here</div> */}
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-box" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <div className="image-container">
                  <img
                    src={require(`../TopSecHome/img_1/${product.image}`)}
                    alt={product.name}
                  />
                </div>
                <div className="description-box">
                  <p className="offer-text">{product.offer} </p>
                  <span className="deal-of-the-day">Deal of the day</span>
                  <p className="product-name">{product.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DealsPage;
