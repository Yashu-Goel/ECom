import React, { useContext, useState } from "react";
import "./SellerNav.css";
import { BiSolidUser } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { SellerContext } from "./SellerProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeftSideBar from "./LeftSideBar"
import Logo from "../Assets/Logo.png"
const SellerNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(SellerContext);
  const [isMenuOpen, setIsMenuOpen]=useState(false)
  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  console.log(isLoggedIn);
  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };
  const handleMenu=()=>{
    if(!isLoggedIn)
    {
      toast.info("Please Login")
      return
    }
    setIsMenuOpen(!isMenuOpen);
    console.log('okok');
  }
  return (
    <div className="SellerMainNav">
      <GiHamburgerMenu className="BurgerLogo" onClick={handleMenu} />
      <div className="SellerLogo">
        <Link to="/seller">
          <img src={Logo}></img>
        </Link>
      </div>
      <BiSolidUser className="UserProfileLogo" onClick={handleUserClick} />
      {isMenuOpen && (
        <div>
          <LeftSideBar />
        </div>
      )}
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
