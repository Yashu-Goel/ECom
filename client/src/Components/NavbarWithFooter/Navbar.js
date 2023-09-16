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
// const categories = [
//   {
//     title: "Fashion",
//     items: [
//       '<i class="fas fa-male"></i> Men',
//       '<i class="fas fa-female"></i> Women',
//       '<i class="fas fa-child"></i> Child',
//       '<i class="fas fa-shoe-prints"></i> Footwear',
//       '<i class="fas fa-pants"></i> Trousers',
//     ],
//   },
//   {
//     title: "Electronics",
//     items: [
//       '<i class="fas fa-mobile-alt"></i> Smart Phones',
//       '<i class="fas fa-tv"></i> Smart TVs',
//       '<i class="fas fa-mobile"></i> Mobile Accessories',
//       '<i class="fas fa-snowflake"></i> Refrigerators',
//       '<i class="fas fa-tint"></i> Washing Machines',
//       '<i class="fas fa-laptop"></i> Other Accessories',
//     ],
//   },
//   {
//     title: "Health",
//     items: [
//       '<i class="fas fa-utensils"></i> Diet And Fitness',
//       '<i class="fas fa-heartbeat"></i> Health Machines',
//       '<i class="fas fa-leaf"></i> Ayurvedic Medicines',
//     ],
//   },
//   {
//     title: "Home Decor",
//     items: [
//       '<i class="fas fa-curtain"></i> Curtains',
//       '<i class="fas fa-bed"></i> Bedsheets',
//       '<i class="fas fa-home"></i> Home Decors',
//       '<i class="fas fa-ellipsis-h"></i> More Items',
//     ],
//   },
//   {
//     title: "Pet Supplies",
//     items: [
//       '<i class="fas fa-bone"></i> Dog Foods',
//       '<i class="fas fa-fish"></i> Cat Foods',
//       '<i class="fas fa-bath"></i> Animal Grooming Kits',
//       '<i class="fas fa-fish"></i> Fish Supplies',
//     ],
//   },
//   {
//     title: "Gifts",
//     items: [
//       '<i class="fas fa-gift"></i> Readymade Gifts',
//       '<i class="fas fa-leaf"></i> Natural Gifts',
//       '<i class="fas fa-hands"></i> Handmade Cards',
//       '<i class="fas fa-gifts"></i> Affordable Presents',
//     ],
//   },
// ];

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
  function toggleCategories() {
    const categories = document.querySelector(".navbar-categories");
    categories.style.display =
      categories.style.display === "none" ? "flex" : "none";
  }

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
        <button className="burger-menu" onClick={() => toggleCategories()}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="logo nav-elements">
          <Link to="/">
            <img src={Logo} />
          </Link>
        </div>

        <div className="navbar-categories">
          {categories.map((category, index) => (
            <div className="custom-dropdown" key={index}>
              <button
                className="custom-btn"
                type="button"
                aria-expanded="false"
              >
                {category.title}
              </button>
              <ul
                className="custom-dropdown-menu"
                aria-labelledby={`custom-dropdownMenuButton${index}`}
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

        <div className="custom-nav-search">
          <input type="text" placeholder="I'm looking for..." />
          <div className="custom-search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="custom-nav-icons">
          {user !== null ? (
            <div className="custom-nav-symbols">
              <button
                className="custom-nav-heart"
                id="custom-dropdown-btn"
                onClick={() => setIsDropdownVisible(!isDropdownVisible)}
              >
                <i className="fa-solid fa-user"></i>
              </button>
              <div
                className={`custom-dropdown-menu ${
                  isDropdownVisible ? "show" : ""
                }`}
                id="custom-dropdown-menu"
              >
                <Link to={"/order-history"}>
                  <i className="fa-solid fa-clipboard-list"></i>My Orders
                </Link>
                <Link to={"/user-profile"}>
                  <i className="fa-solid fa-user"></i>Account
                </Link>

                <button
                  onClick={() => {
                    setLogoutModal(true);
                    setIsDropdownVisible(false);
                  }}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  Logout
                </button>
              </div>
              <button
                className="custom-nav-shop"
                onClick={() => setShowModal(true)}
              >
                {cart && cart.length === 0 ? (
                  <i className="fa-solid fa-cart-shopping"></i>
                ) : (
                  <i className="fa badge" value={cart.length}>
                    &#xf07a;
                  </i>
                )}
              </button>
              <button
                className="custom-nav-heart"
                onClick={() => setHeart(!heart)}
              >
                <i
                  className="fa-solid fa-heart"
                  style={{ color: heart && "red" }}
                ></i>
              </button>
            </div>
          ) : (
            <Link className="custom-nav-login" to={"/auth"}>
              LOGIN | SIGNUP
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
