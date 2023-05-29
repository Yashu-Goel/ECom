import React from "react";
import { useParams } from "react-router-dom";
import "./Product.css";

const Product = () => {
  const { id } = useParams();
  const productDetails = {
    id: { id },
    name: "Perfume Da Lowda Mera Wood Flavour",
    description: "",
    brand: "The Beardo Company",
    MRP: "2358",
    price: "1998",
    pics: ["", "", ""],
    ratings: 4,
    reviews: [{}, {}],
  };
  return (
    <div className="product-page">
      <div className="product-pics"></div>
      <div className="product-desc"></div>
    </div>
  );
};

export default Product;
