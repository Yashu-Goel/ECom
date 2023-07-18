import React, { createContext, useState } from 'react'
const SellerContext = createContext();
const SellerProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

const toggleLoginStatus = () => {
      setIsLoggedIn(!isLoggedIn);
    };

const logout = () => {
       setIsLoggedIn(false);
     };
  return (
    <div>
      <SellerContext.Provider value={{ isLoggedIn, toggleLoginStatus, logout }}>
        {children}
      </SellerContext.Provider>
    </div>
  );
};

export default SellerProvider
export { SellerContext };