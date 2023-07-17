import React, { useState } from "react";
import "./SellerNav.css";
import { BiSolidUser } from "react-icons/bi";
import {Link} from "react-router-dom"
const SellerNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  };

  return (
    <div className="SellerMainNav">
      <BiSolidUser className="UserProfileLogo" onClick={handleUserClick} />

      {isDropdownOpen && (
        <div className="SellerDropdownMenu">
          {isLoggedIn ? (
            <>
              <div className="SellerDataItem">Profile</div>
              <div className="SellerDataItem" onClick={handleLogout}>
                Sign Out
              </div>
            </>
          ) : (
            <div className="SellerDataItem">
              <Link to="/seller_auth"> Login</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SellerNav;
