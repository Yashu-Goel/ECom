import React from "react";
import Navbar from "../Navbar/Navbar";
import Coursel from "../TopSecHome/Coursel";
import ImageSlider from "../TopSecHome/ImageSlider";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Coursel />
      <ImageSlider />
    </div>
  );
};

export default Home;
