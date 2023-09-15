import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
const SellerContext = createContext();
const SellerProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  const isSellerLoggedIn = localStorage.getItem("_id");
  if (isSellerLoggedIn) {
    setIsLoggedIn(true);
  }
}, []);

  const toggleLoginStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  const logout = () => {
    localStorage.removeItem("_id");
    setIsLoggedIn(false)
    toast.info("Logging out...");
    setTimeout(()=>{
    navigate("/seller");
    },3000)
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
