import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import ConfirmationModal from "./ConfirmationModal";
import { UserState } from "../Context/UserProvider";
import CartModal from "../Modal/CartModal";
import Logo from "../Assets/Logo.png";
import { toast } from "react-toastify";

const categories = [
  {
    title: "Fasion",
    items: ["Men", "Women", "Child", "Footwear", "Trousers"],
  },
  {
    title: "Electronics",
    items: [
      "Smart Phones",
      "Smart TVs",
      "Mobile Accessories",
      "Refrigerators",
      "Washing Machines",
      "Other Accessories",
    ],
  },
  {
    title: "Health",
    items: ["Diet And Fitness", "Health Machines", "Ayurvedic Medicines"],
  },
  {
    title: "Home Decor",
    items: ["Curtains", "Bedsheets", "Home Decors", "More Items"],
  },
  {
    title: "Pet Supplies",
    items: ["Dog Foods", "Cat Foods", "Animal Grooming Kits", "Fish Supplies"],
  },
  {
    title: "Gifts",
    items: [
      "Readymade Gifts",
      "Natural Gifts",
      "Handmade Cards",
      "Affordable Presents",
    ],
  },
];

const Navbar = () => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [heart, setHeart] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { user, cart } = UserState();

  const handleLogout = () => {
    try {
      const profileData = localStorage.getItem("profile");
      if (profileData) {
        localStorage.removeItem("profile");
      }

      const addressData = localStorage.getItem("address");
      if (addressData) {
        localStorage.removeItem("address");
      }

      toast.info("Logging out...");

      setTimeout(() => {
        window.location.reload();
      }, 2000);

      setLogoutModal(false);
    } catch (error) {
      console.error("An error occurred during logout:", error);
      toast.error("Logout failed. Please try again later.");
    }
  };

  return (
    <>
      {showModal && <CartModal closeModal={() => setShowModal(false)} />}
      {logoutModal && (
        <ConfirmationModal
          onConfirm={handleLogout}
          onCancel={() => setLogoutModal(false)}
        />
      )}
      <div className="navbar-header">
        <div className="logo nav-elements">
          <Link to="/">
            <img src={Logo} />
          </Link>
        </div>

        <div className="categories">
          {categories.map((category, index) => (
            <div className="dropdown" key={index}>
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id={`dropdownMenuButton${index}`}
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                {category.title}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby={`dropdownMenuButton${index}`}
              >
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link className="dropdown-item" to={`/category/${item}`}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="nav-search">
          <input type="text" placeholder="I'm looking for..." />
          <div className="search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="nav-icons">
          {user !== null ? (
            <div className="nav-symbols">
              <button
                className="nav-heart"
                id="dropdown-btn"
                onClick={() => setIsDropdownVisible(!isDropdownVisible)}
              >
                <i className="fa-solid fa-user"></i>
              </button>
              <div
                className={`dropdown-menu ${isDropdownVisible ? "show" : ""}`}
                id="dropdown-menu"
              >
                <Link to={"/order-history"}>My Orders</Link>
                <Link to={"/user-profile"}>Account</Link>

                <button
                  onClick={() => {
                    setLogoutModal(true);
                    setIsDropdownVisible(false);
                  }}
                >
                  Logout
                </button>
              </div>
              <button className="nav-shop" onClick={() => setShowModal(true)}>
                {cart && cart.length === 0 ? (
                  <i className="fa-solid fa-cart-shopping"></i>
                ) : (
                  <i className="fa badge" value={cart.length}>
                    &#xf07a;
                  </i>
                )}
              </button>
              <button className="nav-heart" onClick={() => setHeart(!heart)}>
                <i
                  className="fa-solid fa-heart"
                  style={{ color: heart && "red" }}
                ></i>
              </button>
            </div>
          ) : (
            <Link className="nav-login" to={"/auth"}>
              LOGIN | SIGNUP
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;