import React from 'react'
import LeftSideBar from './LeftSideBar'
import './SellerHome.css'
import { Link } from 'react-router-dom'
import SellerProvider from "./SellerProvider";
import SellerNav from "./SellerNav";
const SellerHome = () => {
  const data = [
    {
      img: "https://m.media-amazon.com/images/G/01/sp-marketing-toolkit/guides/design/iconography/Brand_Registry._CB424651244_.svg",
      heading: "Transparent pricing, no hidden charges",
      msg: "PrimeBuy publicly displaying its fee structure publicly on all feerelated pages on its website",
    },
    {
      img: "https://m.media-amazon.com/images/G/01/sp-marketing-toolkit/guides/design/iconography/Lightning_Deals_INR._CB424651235_.svg",
      heading: "Secure Timely Payments",
      msg: "Funds are deposited directly to your bank account every 7 days, including for Pay on Delivery order.",
    },
    {
      img: "https://m.media-amazon.com/images/G/01/sp-marketing-toolkit/guides/design/iconography/Free_Shipping._CB424650773_._SY200_.png",
      heading: "Unbeatable Reach",
      msg: "Deliver to 100% of India's serviceable pincodes, through Easy Ship & Fulfillment by PrimeBuy.",
    },
  ];
  return (
    <SellerProvider>
      <div className="SellerNavbar">
        <SellerNav />
      </div>
      <div className="SellerMainContainer">
        <div className="LeftSideBar">
          <LeftSideBar />
        </div>
        <div className="MainContent">
          <div className="LeftMainContainer">
            <h1>Welcome to PrimeBuy Seller</h1>
            <h2>Start Selling to millions of customers</h2>
            <Link to="/product_details">
              <span>Start Selling</span>
            </Link>
            <h3>You will need only 3 things to start selling on PrimeBuy</h3>
            <div className="RequiredThingsImages">
              <div>
                <img src="https://m.media-amazon.com/images/G/31/selldot/icons/GSTIcon1.svg" />
                <p>GST Details</p>
              </div>
              <div>
                <img src="https://m.media-amazon.com/images/G/31/selldot/icons/PANIcon.svg" />
                <p>PAN Details</p>
              </div>
              <div>
                <img src="https://m.media-amazon.com/images/G/31/selldot/icons/BankAccountIcon1.svg" />
                <p>Active Bank Account</p>
              </div>
            </div>
            <p id="WhyUsHeading">Why sellers choose PrimeBuy ?</p>
            <div className="WhyUsOuterContainer">
              {data.map((item, index) => (
                <div>
                  <img src={item.img}></img>
                  <h1>{item.heading}</h1>
                  <p>{item.msg}</p>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="RightMainContainer">
            <img src="https://m.media-amazon.com/images/G/31/amazonservices/landing/50_offer_May.webp" />
          </div> */}
        </div>
      </div>
    </SellerProvider>
  );
}

export default SellerHome