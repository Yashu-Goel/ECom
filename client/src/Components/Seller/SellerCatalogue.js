import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SellerCatalogue.css";
import CatalogueItems from "./CatalogueItems";

const SellerCatalogue = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products/64be1480fa7684fcd56a9ccf")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      });
  }, []);

  return (
    <div>
      {products.map((product) => (
        <CatalogueItems
          key={product._id}
          name={product.name}
          type={product.type}
          price={product.price}
          model={product.model}
          special_feature={product.special_feature}
          imageUrl={product.productImages} 
        />
      ))}
    </div>
  );
};


export default SellerCatalogue;
