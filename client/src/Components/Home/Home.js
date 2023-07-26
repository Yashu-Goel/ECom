import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Coursel from "../TopSecHome/Coursel";
import ImageSlider from "../TopSecHome/ImageSlider";
import firstSlider from "../dummyDatas/firstSlider.json";
import kitchenSlider from "../dummyDatas/kitchen.json";
import fragranceSlider from "../dummyDatas/fragranceSlider.json";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Coursel />
      <div className="first-coursel">
        <div className="deal-header">
          <h1>Today's Deals</h1>
          <Link to={"todays_deals"}> See all deals</Link>
        </div>
        <ImageSlider slider={firstSlider} loop={true} text={true} />
      </div>
      <div className="first-coursel">
        <div className="deal-header">
          <h1>Home and Kitchen Essentials</h1>
          <Link to={"kitchen-home-details"}> See all deals</Link>
        </div>
        <ImageSlider slider={kitchenSlider} loop={false} text={true} />
      </div>
      <div className="first-coursel">
        <div className="deal-header">
          <h1>Beauty Product and Fragrances</h1>
          <Link to={"beauty-fragrances"}>See all deals</Link>
        </div>
        <ImageSlider slider={fragranceSlider} loop={false} text={false} />
      </div>
    </div>
  );
};
export default Home;

