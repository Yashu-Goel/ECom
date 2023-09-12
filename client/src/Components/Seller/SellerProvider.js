import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    navigate("/seller");
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
