import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
import { API_BASE } from "../functions/functions";

const SellerContext = createContext();

const SellerProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const isSellerLoggedIn = localStorage.getItem("_id");
      if (isSellerLoggedIn) {
        const response = await axios.get(
          API_BASE + "/seller/seller_details/" + isSellerLoggedIn
        );
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const toggleLoginStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const logout = () => {
    localStorage.removeItem("_id");
    setIsLoggedIn(false);
    toast.info("Logging out...");
    setTimeout(() => {
      navigate("/seller");
    }, 3000);
  };

  return (
    <div>
      <SellerContext.Provider value={{ isLoggedIn, toggleLoginStatus, logout }}>
        {children}
      </SellerContext.Provider>
    </div>
  );
};

export default SellerProvider;
export { SellerContext };
