import React from "react";
import "./TrendingPage.css";
const TrendingPage = () => {
  const trendingHeadphones = [
    {
      imgSrc:
        "https://i.postimg.cc/259swWhF/22723ede15755b068b7a355e0ad5d65e-headphone-clipart-beats-headphone-pencil-and-in-color-headphone-10.png",
      title: "Wireless Headphone",
      price: 245,
      buyLink: "#",
    },
    {
      imgSrc:
        "https://i.postimg.cc/259swWhF/22723ede15755b068b7a355e0ad5d65e-headphone-clipart-beats-headphone-pencil-and-in-color-headphone-10.png",
      title: "HP Gaming Laptop",
      price: 58799,
      buyLink: "#",
    },
    {
      imgSrc:
        "https://i.postimg.cc/259swWhF/22723ede15755b068b7a355e0ad5d65e-headphone-clipart-beats-headphone-pencil-and-in-color-headphone-10.png",
      title: "Premium Wireless Headphones",
      price: 349,
      buyLink: "#",
    },
    {
      imgSrc:
        "https://i.postimg.cc/259swWhF/22723ede15755b068b7a355e0ad5d65e-headphone-clipart-beats-headphone-pencil-and-in-color-headphone-10.png",
      title: "Premium Wireless Headphones",
      price: 349,
      buyLink: "#",
    },
    // Add more headphone instances as needed...
  ];
  return (
    <div className="trending-ele">
      <h1 className="trending-header">Trending</h1>
      <div className="outer-trending-grid">
        {trendingHeadphones.map((product, index) => (
          <div className="trending-card">
            <div className="imgBx">
              <img src={product.imgSrc} alt="" />
            </div>
            <div className="contextBx">
              <h3>{product.title}</h3>
              <h2 className="price">₹{product.price}</h2>
              <a href={product.buyLink} className="buy">
                Buy now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPage;
