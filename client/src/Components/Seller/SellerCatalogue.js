import React, { useState, useEffect } from "react";
import axios from "axios";
import CatalogueItems from "./CatalogueItems";

const API_BASE = "http://localhost:5000";

const SellerCatalogue = () => {
  const [products, setProducts] = useState([]);
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const sellerId = localStorage.getItem("_id");
        const response = await axios.get(
          API_BASE + `/seller/products?sellerId=${sellerId}`
        );
        setProducts(response.data); // Set the retrieved product details to the state
        if (response.data.length > 0) {
          setFlag(1); // Set the flag to 1 if there are products
        }
        console.log("Products:", response.data); // Log the response.data directly
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, []);
  
  return (
    <div>
      {flag &&
        products.map((product) => (
          <CatalogueItems
            key={product._id}
            name={product.name}
            category={product.category}
            price={product.price}
            MRP={product.MRP}
            model={product.model}
            description={product.description}
            brand={product.brand}
            quantity={product.quantity}
            pics={product.pics.map((pic) => getFileNameFromPath(pic))} 
          />
        ))}
    </div>
  );
};

export default SellerCatalogue;
function getFileNameFromPath(path) {
  const parts = path.split("\\");
  return parts[parts.length - 1];
}