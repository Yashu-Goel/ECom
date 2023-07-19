import React, { useContext, useState } from "react";
import "./SellerNav.css";
import { BiSolidUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { SellerContext } from "./SellerProvider";
const SellerNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(SellerContext);

  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };
  return (
    <div className="SellerMainNav">
      <BiSolidUser className="UserProfileLogo" onClick={handleUserClick} />

      {isDropdownOpen && (
        <div className="SellerDropdownMenu">
          {isLoggedIn ? (
            <>
              <div className="SellerDataItem">
                <Link to="/profile"> Profile </Link>
              </div>
              <div className="SellerDataItem" onClick={handleLogout}>
                Sign Out
              </div>
            </>
          ) : (
            <div className="SellerDataItem">
              <Link to="/seller_auth">Login</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SellerNav;
