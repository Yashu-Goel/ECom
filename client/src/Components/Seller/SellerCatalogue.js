import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CatalogueItems from "./CatalogueItems";
import "./SellerCatalogue.css";
import SellerNav from "./SellerNav";
import Loading from "./Loading";
import { SellerContext } from "./SellerProvider";
import { API_BASE } from "../functions/functions";
import ErrorPage from "./Modal/ErrorPage";

const SellerCatalogue = () => {
  const { isLoggedIn, toggleLoginStatus, logout } = useContext(SellerContext);
  const [products, setProducts] = useState([]);
  const [flag, setFlag] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        loading ? (
          <Loading />
        ) : (
          <div className="SellerCatalogueMainContainer">
            <SellerNav />
            <h1 className="CatalogueHeading">Catalogue</h1>
            <div className="SellerCatalogueInnerContainer">
              {flag &&
                products.map((product) => (
                  <CatalogueItems
                    key={product._id} // Make sure to add a key when mapping over elements
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
        )
      ) : (
        <ErrorPage />
      )}
    </div>
  );
};

export default SellerCatalogue;
