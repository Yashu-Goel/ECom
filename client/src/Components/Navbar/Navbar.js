import React from "react";
import "./Navbar.css";
const Navbar = () => {
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
        {/* <button className="nav-icon-btn"> */}

        <i class="fa-solid fa-user"></i>
        {/* </button> */}
        {/* <button className="nav-icon-btn"> */}
        <i class="fa-solid fa-cart-shopping"></i>
        {/* </button> */}
        {/* <button className="nav-icon-btn"> */}
        <i class="fa-solid fa-heart"></i>
        {/* </button> */}
      </div>
    </div>
  );
};

export default Navbar;
