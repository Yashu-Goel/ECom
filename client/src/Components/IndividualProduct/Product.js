import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Product.css";

const Product = () => {
  const [imageSrc, setImageSrc] = useState(require(`../TopSecHome/img_1/slider10Images/image1.webp`));

  const addImage = (pic) => {
    setImageSrc(require(`../TopSecHome/img_1/slider10Images/${pic}`));
  };

  const { id } = useParams();
  const productDetails = {
    id: { id },
    name: "Perfume Da Lowda Mera Wood Flavour",
    description: "",
    brand: "The Beardo Company",
    MRP: "2358",
    price: "1998",
    pics: [
      "image1.webp",
      "image2.webp",
      "image3.webp",
      "image4.webp",
      "image5.webp",
    ],
    ratings: 4,
    reviews: [{}, {}],
  };

  function setClassName(index, pic) {
    const Img = document.querySelectorAll(".current");
    Img.forEach((items) => {
      items.classList.remove("active");
    });
    Img[index].classList.add("active");
    const mainImgae = document.getElementsByClassName("main-image");
    addImage(pic);
  }
  console.log(imageSrc)
  return (
    <>
      <Navbar />
      <div className="product-page">
        <div className="product-pics outer-divs">
          <div className="image-thums">
            {productDetails.pics.map((pic, index) => {
              return (
                <div className="inner-thumb-pics" key={index}>
                  <img
                    src={require(`../TopSecHome/img_1/slider10Images/${pic}`)}
                    alt=""
                    onMouseOver={() => setClassName(index, pic)}
                    className="current "
                  />
                </div>
              );
            })}
          </div>
          <div className="main-image">
            <img
              src={imageSrc}
              alt="first"
            />
          </div>
        </div>
        <div className="product-desc outer-divs">

        </div>
        <div className="product-buy outer-divs"></div>
      </div>
    </>
  );
};

export default Product;
