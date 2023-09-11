import React, { useState, useEffect } from "react";
import axios from "axios";
import CatalogueItems from "./CatalogueItems";
import "./SellerCatalogue.css";
import SellerNav from "./SellerNav";
import Loading from "./Loading";

const API_BASE = "http://192.168.0.103:5000";

const SellerCatalogue = () => {
  const [products, setProducts] = useState([]);
  const [flag, setFlag] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const sellerId = localStorage.getItem("_id");
        const response = await axios.get(
          API_BASE + `/seller/products?sellerId=${sellerId}`
        );
        setProducts(response.data); 
        if (response.data.length > 0) {
          setFlag(1); 
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, []);
// console.log(products);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="SellerCatalogueMainContainer">
          <SellerNav />
          <h1 className="CatalogueHeading">Catalogue</h1>
          <div className="SellerCatalogueInnerContainer">
            {flag &&
              products.map((product) => (
                <CatalogueItems
                  id={product._id}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  MRP={product.MRP}
                  model={product.model}
                  description={product.description}
                  brand={product.brand}
                  quantity={product.quantity}
                  pics={product.imageName}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerCatalogue;

