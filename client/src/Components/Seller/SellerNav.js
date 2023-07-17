import React, { useState } from "react";
import "./SellerNav.css";
import { BiSolidUser } from "react-icons/bi";
import { Link } from "react-router-dom";

const SellerNav = (props) => {
  console.log(props.isLoggedIn);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
  };
  
  return (
    <div className="SellerMainNav">
      <BiSolidUser className="UserProfileLogo" onClick={handleUserClick} />

      {isDropdownOpen && (
        <div className="SellerDropdownMenu">
          {console.log("Is Log In "+props.isLoggedIn)}
          {props.isLoggedIn ? (
            <>
              <div className="SellerDataItem">Profile</div>
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
