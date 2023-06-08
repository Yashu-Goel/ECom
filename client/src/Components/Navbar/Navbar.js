import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserState } from "../Context/UserProvider";

const Navbar = () => {
  const { user, setUser, cart, setCart } = UserState();

  // const [login, setLogin] = useState(false);
  // const [shop, setShop] = useState(false);
  const [heart, setHeart] = useState(false);

  return (
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
            <button className="nav-heart">
              <i class="fa-solid fa-user"></i>
            </button>
            <button className="nav-shop">
              {cart.length === 0 ? (
                <i class="fa-solid fa-cart-shopping"></i>
              ) : (
                <i class="fa badge" value={cart.length}>
                  &#xf07a;
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
  );
};

export default Navbar;
