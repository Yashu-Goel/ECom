import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import ConfirmationModal from "./ConfirmationModal";
import { UserState } from "../Context/UserProvider";
import CartModal from "../Modal/CartModal";
import Logo from "../Assets/Logo.png";
const Navbar = () => {
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [heart, setHeart] = useState(false);
  const { user, cart } = UserState();

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const dropdownMenu = document.getElementById("dropdown-menu");

  function loadAccount() {
    dropdownMenu.classList.add("show");
  }

  /* logout logic */

  const handleLogout = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmLogout = () => {
    // Implement your logout logic here
    console.log("Logout confirmed");
    setConfirmationOpen(false);
  };

  const handleCancelLogout = () => {
    setConfirmationOpen(false);
  };

  return (
    <>
      {showModal && <CartModal closeModal={closeModal} />}
      <div className="navbar-header">
        <div className="logo nav-elements">
          <Link to="/">
            <img src={Logo} />
          </Link>
        </div>

        <div className="categories">
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Fasion
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a className="dropdown-item" href="#">
                  Men
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Women
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Child
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Footwear
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Trousers
                </a>
              </li>
            </ul>
          </div>

          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Electronics
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a className="dropdown-item" href="#">
                  Smart Phones
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Smart TVs
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Mobile Accessories
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Refridgerators
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Washing Machines
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Other Accessories
                </a>
              </li>
            </ul>
          </div>

          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Health
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a className="dropdown-item" href="#">
                  Diet And Fitness
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Health Machines
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Ayurvedic Medicines
                </a>
              </li>
            </ul>
          </div>

          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Home Decor
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a className="dropdown-item" href="#">
                  Curtains
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Bedsheets
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Home Decors
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  More Items
                </a>
              </li>
            </ul>
          </div>

          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Pet Supplies
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a className="dropdown-item" href="#">
                  Dog Foods
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Cat Foods
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Animal Grooming Kits
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Fish Supplies
                </a>
              </li>
            </ul>
          </div>

          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Gifts
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a className="dropdown-item" href="#">
                  Readymade Gifts
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Natural Gifts
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Handmade Cards
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Affordable Presents
                </a>
              </li>
            </ul>
          </div>
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
                onClick={loadAccount}
              >
                <i className="fa-solid fa-user"></i>
              </button>
              <div className="dropdown-menu" id="dropdown-menu">
                <Link to={"/order-history"}>My Orders</Link>
                <Link to={"/user-profile"}>Account</Link>
                <button onClick={handleLogout}>Logout</button>
                <ConfirmationModal
                  isOpen={isConfirmationOpen}
                  onConfirm={handleConfirmLogout}
                  onCancel={handleCancelLogout}
                />
              </div>
              <button className="nav-shop" onClick={openModal}>
                {cart.length === 0 ? (
                  <i className="fa-solid fa-cart-shopping"></i>
                ) : (
                  <i className="fa badge" value={cart.length}>
                    &#xf07a; {cart.length}
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
