import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import ConfirmationModal from "./ConfirmationModal";
import { UserState } from "../Context/UserProvider";
import CartModal from "../Modal/CartModal";

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
    dropdownMenu.classList.toggle("show");
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
        <div className="logo nav-elements">Logo</div>

        <div className="categories">
          <div class="dropdown">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Fasion
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a class="dropdown-item" href="#">
                  Men
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Women
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Child
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Footwear
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Trousers
                </a>
              </li>
            </ul>
          </div>

          <div class="dropdown">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Electronics
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a class="dropdown-item" href="#">
                  Smart Phones
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Smart TVs
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Mobile Accessories
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Refridgerators
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Washing Machines
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Other Accessories
                </a>
              </li>
            </ul>
          </div>

          <div class="dropdown">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Health
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a class="dropdown-item" href="#">
                  Diet And Fitness
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Health Machines
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Ayurvedic Medicines
                </a>
              </li>
            </ul>
          </div>

          <div class="dropdown">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Home Decor
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a class="dropdown-item" href="#">
                  Curtains
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Bedsheets
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Home Decors
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  More Items
                </a>
              </li>
            </ul>
          </div>

          <div class="dropdown">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Pet Supplies
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a class="dropdown-item" href="#">
                  Dog Foods
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Cat Foods
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Animal Grooming Kits
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Fish Supplies
                </a>
              </li>
            </ul>
          </div>

          <div class="dropdown">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Gifts
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a class="dropdown-item" href="#">
                  Readymade Gifts
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Natural Gifts
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Handmade Cards
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Affordable Presents
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="nav-search">
          <input type="text" placeholder="I'm looking for..." />
          <div className="search-icon">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="nav-icons">
          {user !== null ? (
            <div className="nav-symbols">
              <button class="nav-heart" id="dropdown-btn" onClick={loadAccount}>
                <i class="fa-solid fa-user"></i>
              </button>
              <div class="dropdown-menu" id="dropdown-menu">
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
                  <i class="fa-solid fa-cart-shopping"></i>
                ) : (
                  <i class="fa badge" value={cart.length}>
                    &#xf07a; {cart.length}
                  </i>
                )}
              </button>
              <button className="nav-heart" onClick={() => setHeart(!heart)}>
                <i
                  class="fa-solid fa-heart"
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
