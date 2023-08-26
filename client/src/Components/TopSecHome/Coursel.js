// import React, { useState, useEffect } from "react";
// import "./Coursel.css";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// const Coursel = () => {
//   return (
//     <div className="carousel-wrapper">
//       <Carousel
//         className="coursel"
//         infiniteLoop
//         useKeyboardArrows={true}
//         autoPlay="true"
//         interval="5000"
//         showThumbs={false}
//         showStatus={false}
//       >
//         <div>
//           <img src={require("./img_1/Fasion.jpg")} alt="helo" />
//           <p
//             style={{
//               position: "absolute",
//               left: "50%",
//               bottom: "50%",
//               color: "white",
//               transform: " translateX(-50%)",
//               fontSize: "3rem",
//               textTransform: "uppercase",
//               fontWeight: "Bold",
//               padding: " 0 10px",
//               backgroundColor: "black",
//               borderRadius: "10px",
//               border: "2px solid #fff",
//             }}
//           >
//             trending styleverse&#128090;
//           </p>
//         </div>

//         <div>
//           <img src={require("./img_1/Gadgets.jpg")} alt="eletronics" />
//           <p
//             style={{
//               position: "absolute",
//               left: "50%",
//               bottom: "50%",
//               color: "white",
//               transform: " translateX(-50%)",
//               fontSize: "3rem",
//               textTransform: "uppercase",
//               fontWeight: "Bold",
//               padding: " 0 10px",
//               backgroundColor: "black",
//               borderRadius: "10px",
//               border: "2px solid #fff",
//             }}
//           >
//             Gadgets&#128241;
//           </p>
//         </div>
//         <div>
//           <img src={require("./img_1/Fitness.jpg")} alt="fitness" />
//           <p
//             style={{
//               position: "absolute",
//               left: "50%",
//               bottom: "50%",
//               color: "white",
//               transform: " translateX(-50%)",
//               fontSize: "3rem",
//               textTransform: "uppercase",
//               fontWeight: "Bold",
//               padding: " 0 10px",
//               backgroundColor: "black",
//               borderRadius: "10px",
//               border: "2px solid #fff",
//             }}
//           >
//             Health and Fitness&#127947;
//           </p>
//         </div>
//         <div>
//           <img src={require("./img_1/HomeDecor.jpg")} alt="homeDecor" />
//           <p
//             style={{
//               position: "absolute",
//               left: "50%",
//               bottom: "50%",
//               color: "white",
//               transform: " translateX(-50%)",
//               fontSize: "3rem",
//               textTransform: "uppercase",
//               fontWeight: "Bold",
//               padding: " 0 10px",
//               backgroundColor: "black",
//               borderRadius: "10px",
//               border: "2px solid #fff",
//             }}
//           >
//             Home Decor&#129716;
//           </p>
//         </div>
//         <div>
//           <img src={require("./img_1/Dogs.jpg")} alt="homeDecor" />
//           <p
//             style={{
//               position: "absolute",
//               left: "50%",
//               bottom: "50%",
//               color: "white",
//               transform: " translateX(-50%)",
//               fontSize: "3rem",
//               textTransform: "uppercase",
//               fontWeight: "Bold",
//               padding: " 0 10px",
//               backgroundColor: "black",
//               borderRadius: "10px",
//               border: "2px solid #fff",
//             }}
//           >
//             Pet Supplies&#128062;
//           </p>
//         </div>
//         <div>
//           <img src={require("./img_1/Gifts.jpg")} alt="homeDecor" />
//           <p
//             style={{
//               position: "absolute",
//               left: "50%",
//               bottom: "50%",
//               color: "white",
//               transform: " translateX(-50%)",
//               fontSize: "3rem",
//               textTransform: "uppercase",
//               fontWeight: "Bold",
//               padding: " 0 10px",
//               backgroundColor: "black",
//               borderRadius: "10px",
//               border: "2px solid #fff",
//             }}
//           >
//             Surprise Spheres &#127873;
//           </p>
//         </div>
//       </Carousel>
//     </div>
//   );
// };

// export default Coursel;
import React, { useEffect, useState } from "react";
import "./Coursel.css";

const Coursel = () => {
  const images = [
    {
      src: require("./img_1/Fasion.jpg"),
      alt: "Fashion",
      caption: "Trending Styleverse👑",
    },
    {
      src: require("./img_1/Gadgets.jpg"),
      alt: "Gadgets",
      caption: "Gadgets📱",
    },
    {
      src: require("./img_1/Fitness.jpg"),
      alt: "Fitness",
      caption: "Health and Fitness💪",
    },
    {
      src: require("./img_1/HomeDecor.jpg"),
      alt: "Home Decor",
      caption: "Home Decor🏠",
    },
    {
      src: require("./img_1/Dogs.jpg"),
      alt: "Pet Supplies",
      caption: "Pet Supplies🐶",
    },
    {
      src: require("./img_1/Gifts.jpg"),
      alt: "Surprise Spheres",
      caption: "Surprise Spheres🎁",
    },
  ];
  const [curSlide, setCurSlide] = useState(0);
  const slides = document.querySelectorAll(".image-coursel");
  const maxSlide = slides.length;

  useEffect(() => {
    goToSlide(0);
    setCurSlide(0); // Using setState to update the current slide
  }, []);

  function goToSlide(slide) {
    slides.forEach((s, i) => {
      const translateXNum = 80 * (i - slide);
      let translateYNum, rotateDeg, grayscaleNum, zIndexNum, opacityNum;
      if (translateXNum === 0) {
        translateYNum = 0;
        rotateDeg = 0;
        grayscaleNum = 0;
        zIndexNum = 1;
        opacityNum = 100;
      } else if (translateXNum < 0) {
        translateYNum = 5;
        rotateDeg = -5;
        grayscaleNum = 1;
        zIndexNum = 0;
        opacityNum = 20;
      } else {
        translateYNum = 5;
        rotateDeg = 5;
        grayscaleNum = 1;
        zIndexNum = 0;
        opacityNum = 20;
      }
      s.style.transform = `translate(${translateXNum}%, ${translateYNum}%) rotate(${rotateDeg}deg)`;
      s.style.filter = `grayscale(${grayscaleNum})`;
      s.style.zIndex = zIndexNum;
      s.style.opacity = `${opacityNum}%`;
    });
  }

  const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
      setCurSlide(0);
    } else {
      setCurSlide(curSlide + 1);
    }
    goToSlide(curSlide);
  };

  const prevSlide = () => {
    if (curSlide === 0) {
      setCurSlide(maxSlide - 1);
    } else {
      setCurSlide(curSlide - 1);
    }
    goToSlide(curSlide);
  };

  return (
    <>
      <div class="pic-outer-container">
        <div class="pic-container">
          <div class="image-coursel pic-1">
            <img
              class="pic__img"
              src="https://images.unsplash.com/photo-1681066471074-d45c49154f44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODE0OTcxOTQ&ixlib=rb-4.0.3&q=80&w=400"
              alt=""
            />
          </div>
          <div class="image-coursel pic-2">
            <img
              class="pic__img"
              src="https://images.unsplash.com/photo-1680631757284-617846a5ef29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODE0OTcxNTU&ixlib=rb-4.0.3&q=80&w=400"
              alt=""
            />
          </div>
          <div class="image-coursel pic-3">
            <img
              class="pic__img"
              src="https://plus.unsplash.com/premium_photo-1669951581968-73b5b71face3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODE0OTcyNjE&ixlib=rb-4.0.3&q=80&w=400"
              alt=""
            />
          </div>
          <div class="image-coursel pic-4">
            <img
              class="pic__img"
              src="https://plus.unsplash.com/premium_photo-1676734032797-21789f57978a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODE0OTcxOTQ&ixlib=rb-4.0.3&q=80&w=400"
              alt=""
            />
          </div>
          <div class="image-coursel pic-5">
            <img
              class="pic__img"
              src="https://images.unsplash.com/photo-1678789604985-18d290d56fe0?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODE0OTcyNjE&ixlib=rb-4.0.3&q=85&w=400"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="slider-btns">
        <button class="btn-left" onClick={nextSlide}>
          {"<"}
        </button>
        <button class="btn-right" onClick={prevSlide}>
          {">"}
        </button>
      </div>
    </>
  );
};

export default Coursel;
