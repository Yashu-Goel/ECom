import React, { useState, useEffect } from "react";
import "./Coursel.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Coursel = () => {
  return (
    <div className="carousel-wrapper">
      <Carousel
        className="coursel"
        infiniteLoop
        useKeyboardArrows={true}
        autoPlay="true"
        interval="5000"
        showThumbs={false}
        showStatus={false}
      >
        <div>
          <img src={require("./img_1/Fasion.jpg")} alt="helo" />
          <p
            style={{
              position: "absolute",
              left: "50%",
              bottom: "50%",
              color: "white",
              transform: " translateX(-50%)",
              fontSize: "3rem",
              textTransform: "uppercase",
              fontWeight: "Bold",
              padding: " 0 10px",
              backgroundColor: "black",
              borderRadius: "10px",
              border: "2px solid #fff",
            }}
          >
            trending styleverse&#128090;
          </p>
        </div>

        <div>
          <img src={require("./img_1/Gadgets.jpg")} alt="eletronics" />
          <p
            style={{
              position: "absolute",
              left: "50%",
              bottom: "50%",
              color: "white",
              transform: " translateX(-50%)",
              fontSize: "3rem",
              textTransform: "uppercase",
              fontWeight: "Bold",
              padding: " 0 10px",
              backgroundColor: "black",
              borderRadius: "10px",
              border: "2px solid #fff",
            }}
          >
            Gadgets&#128241;
          </p>
        </div>
        <div>
          <img src={require("./img_1/Fitness.jpg")} alt="fitness" />
          <p
            style={{
              position: "absolute",
              left: "50%",
              bottom: "50%",
              color: "white",
              transform: " translateX(-50%)",
              fontSize: "3rem",
              textTransform: "uppercase",
              fontWeight: "Bold",
              padding: " 0 10px",
              backgroundColor: "black",
              borderRadius: "10px",
              border: "2px solid #fff",
            }}
          >
            Health and Fitness&#127947;
          </p>
        </div>
        <div>
          <img src={require("./img_1/HomeDecor.jpg")} alt="homeDecor" />
          <p
            style={{
              position: "absolute",
              left: "50%",
              bottom: "50%",
              color: "white",
              transform: " translateX(-50%)",
              fontSize: "3rem",
              textTransform: "uppercase",
              fontWeight: "Bold",
              padding: " 0 10px",
              backgroundColor: "black",
              borderRadius: "10px",
              border: "2px solid #fff",
            }}
          >
            Home Decor&#129716;
          </p>
        </div>
        <div>
          <img src={require("./img_1/Dogs.jpg")} alt="homeDecor" />
          <p
            style={{
              position: "absolute",
              left: "50%",
              bottom: "50%",
              color: "white",
              transform: " translateX(-50%)",
              fontSize: "3rem",
              textTransform: "uppercase",
              fontWeight: "Bold",
              padding: " 0 10px",
              backgroundColor: "black",
              borderRadius: "10px",
              border: "2px solid #fff",
            }}
          >
            Pet Supplies&#128062;
          </p>
        </div>
        <div>
          <img src={require("./img_1/Gifts.jpg")} alt="homeDecor" />
          <p
            style={{
              position: "absolute",
              left: "50%",
              bottom: "50%",
              color: "white",
              transform: " translateX(-50%)",
              fontSize: "3rem",
              textTransform: "uppercase",
              fontWeight: "Bold",
              padding: " 0 10px",
              backgroundColor: "black",
              borderRadius: "10px",
              border: "2px solid #fff",
            }}
          >
            Surprise Spheres &#127873;
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default Coursel;
