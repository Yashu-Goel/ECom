// src/components/ProductsPage.js
import React from "react";
import { Link } from "react-router-dom";
import "./DealsPage.css";

const DealsPage = () => {
  // Sample data for products
  const products = [
    {
      id: 1,
      name: "Mobile Phones and Accessories",
      offer: "66% off",
      category: "Electronics",
      image: "slider1.jpg",
    },
    {
      id: 2,
      name: "Kitchen Appliances and Grinders",
      offer: "12% off",
      category: "Kitchen Appliances",
      image: "slider2.jpg",
    },
    {
      id: 3,
      name: "Earbuds and accessories",
      offer: "50% off",
      category: "gadgets",
      image: "slider3.jpg",
    },
    {
      id: 4,
      name: "Premium shoes",
      offer: "33% off",
      category: "Shoes",
      image: "slider4.jpg",
    },
    {
      id: 5,
      name: "Micromax and Iphones",
      offer: "8% off",
      category: "Electronics",
      image: "slider5.jpg",
    },
    {
      id: 6,
      name: "Kids wear",
      offer: "66% off",
      category: "Apparel",
      image: "slider6.jpg",
    },
    {
      id: 7,
      name: "Desktop Accessories",
      offer: "13% off",
      category: "Gadgets",
      image: "slider7.jpg",
    },
    {
      id: 8,
      name: "Cameras and DSLR",
      offer: "22% off",
      category: "Camera",
      image: "slider8.jpg",
    },
    {
      id: 9,
      name: "Pericardin and Parkers",
      offer: "75% off",
      category: "Stationary",
      image: "slider9.jpg",
    },
    {
      id: 1,
      name: "Mobile Phones and Accessories",
      offer: "66% off",
      category: "Electronics",
      image: "slider1.jpg",
    },
    {
      id: 2,
      name: "Kitchen Appliances and Grinders",
      offer: "12% off",
      category: "Kitchen Appliances",
      image: "slider2.jpg",
    },
    {
      id: 3,
      name: "Earbuds and accessories",
      offer: "50% off",
      category: "gadgets",
      image: "slider3.jpg",
    },
    {
      id: 4,
      name: "Premium shoes",
      offer: "33% off",
      category: "Shoes",
      image: "slider4.jpg",
    },
    {
      id: 5,
      name: "Micromax and Iphones",
      offer: "8% off",
      category: "Electronics",
      image: "slider5.jpg",
    },
    {
      id: 6,
      name: "Kids wear",
      offer: "66% off",
      category: "Apparel",
      image: "slider6.jpg",
    },
    {
      id: 7,
      name: "Desktop Accessories",
      offer: "13% off",
      category: "Gadgets",
      image: "slider7.jpg",
    },
    {
      id: 8,
      name: "Cameras and DSLR",
      offer: "22% off",
      category: "Camera",
      image: "slider8.jpg",
    },
    {
      id: 9,
      name: "Pericardin and Parkers",
      offer: "75% off",
      category: "Stationary",
      image: "slider9.jpg",
    },
    {
      id: 1,
      name: "Mobile Phones and Accessories",
      offer: "66% off",
      category: "Electronics",
      image: "slider1.jpg",
    },
    {
      id: 2,
      name: "Kitchen Appliances and Grinders",
      offer: "12% off",
      category: "Kitchen Appliances",
      image: "slider2.jpg",
    },
    {
      id: 3,
      name: "Earbuds and accessories",
      offer: "50% off",
      category: "gadgets",
      image: "slider3.jpg",
    },
    {
      id: 4,
      name: "Premium shoes",
      offer: "33% off",
      category: "Shoes",
      image: "slider4.jpg",
    },
    {
      id: 5,
      name: "Micromax and Iphones",
      offer: "8% off",
      category: "Electronics",
      image: "slider5.jpg",
    },
    {
      id: 6,
      name: "Kids wear",
      offer: "66% off",
      category: "Apparel",
      image: "slider6.jpg",
    },
    {
      id: 7,
      name: "Desktop Accessories",
      offer: "13% off",
      category: "Gadgets",
      image: "slider7.jpg",
    },
    {
      id: 8,
      name: "Cameras and DSLR",
      offer: "22% off",
      category: "Camera",
      image: "slider8.jpg",
    },
    {
      id: 9,
      name: "Pericardin and Parkers",
      offer: "75% off",
      category: "Stationary",
      image: "slider9.jpg",
    },
    {
      id: 1,
      name: "Mobile Phones and Accessories",
      offer: "66% off",
      category: "Electronics",
      image: "slider1.jpg",
    },
    {
      id: 2,
      name: "Kitchen Appliances and Grinders",
      offer: "12% off",
      category: "Kitchen Appliances",
      image: "slider2.jpg",
    },
    {
      id: 3,
      name: "Earbuds and accessories",
      offer: "50% off",
      category: "gadgets",
      image: "slider3.jpg",
    },
    {
      id: 4,
      name: "Premium shoes",
      offer: "33% off",
      category: "Shoes",
      image: "slider4.jpg",
    },
    {
      id: 5,
      name: "Micromax and Iphones",
      offer: "8% off",
      category: "Electronics",
      image: "slider5.jpg",
    },
    {
      id: 6,
      name: "Kids wear",
      offer: "66% off",
      category: "Apparel",
      image: "slider6.jpg",
    },
    {
      id: 7,
      name: "Desktop Accessories",
      offer: "13% off",
      category: "Gadgets",
      image: "slider7.jpg",
    },
    {
      id: 8,
      name: "Cameras and DSLR",
      offer: "22% off",
      category: "Camera",
      image: "slider8.jpg",
    },
    {
      id: 9,
      name: "Pericardin and Parkers",
      offer: "75% off",
      category: "Stationary",
      image: "slider9.jpg",
    },
    // Add more product data here...
  ];

  return (
    <>
      <div id="wrap">
        <div id="columns" class="columns_4">
        <figure>
          <img src="https://i.imgur.com/ruU04I6.jpg" />
          <figcaption>Green Checkered Shirt</figcaption>
          <span class="price">$44</span>
          <a class="button" href="#">
            Buy Now
          </a>
        </figure>

        <figure>
          <img src="https://i.imgur.com/sPxEkEI.jpg" />
          <figcaption>Green and Black Flowers</figcaption>
          <span class="price">$44</span>
          <a class="button" href="#">
            Buy Now
          </a>
        </figure>

        <figure>
          <img src="https://i.imgur.com/S3Umfmb.jpg" />
          <figcaption>Black Dots</figcaption>
          <span class="price">$44</span>
          <a class="button" href="#">
            Buy Now
          </a>
        </figure>

        <figure>
          <img src="https://i.imgur.com/x1IZjjy.jpg" />
          <figcaption>Red Flowy</figcaption>
          <span class="price">$44</span>
          <a class="button" href="#">
            Buy Now
          </a>
        </figure>

        <figure>
          <img src="https://i.imgur.com/Jv8IWKQ.jpg" />
          <figcaption>Yellow Button-Up</figcaption>
          <span class="price">$44</span>
          <a class="button" href="#">
            Buy Now
          </a>
        </figure>

        <figure>
          <img src="https://i.imgur.com/MpLejRu.jpg" />
          <figcaption>Put a Bird On It</figcaption>
          <span class="price">$44</span>
          <a class="button" href="#">
            Buy Now
          </a>
        </figure>

        <figure>
          <img src="https://i.imgur.com/SZmPJ7W.jpg" />
          <figcaption>Polka Dots</figcaption>
          <span class="price">$44</span>
          <a class="button" href="#">
            Buy Now
          </a>
        </figure>

        <figure>
          <img src="https://i.imgur.com/OiEMgMx.jpg" />
          <figcaption>Blue Spots</figcaption>
          <span class="price">$44</span>
          <a class="button" href="#">
            Buy Now
          </a>
        </figure>

        <figure>
          <img src="https://i.imgur.com/HolvggB.jpg" />
          <figcaption>Pink Dots</figcaption>
          <span class="price">$44</span>
          <a class="button" href="#">
            Buy Now
          </a>
        </figure>
      </div>
      </div>
    </>
  );
};

export default DealsPage;
