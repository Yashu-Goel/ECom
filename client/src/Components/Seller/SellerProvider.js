import React, { createContext, useState, useEffect } from "react";
const SellerContext = createContext();
const SellerProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
useEffect(() => {
  // Check if _id is present in local storage
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
