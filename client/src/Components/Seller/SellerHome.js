import React, { useContext } from "react";
import "./SellerHome.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SellerProvider from "./SellerProvider";
import SellerNav from "./SellerNav";
import { SellerContext } from "./SellerProvider";
import { useNavigate } from "react-router-dom";

const SellerHome = () => {
    const { isLoggedIn, toggleLoginStatus, logout } = useContext(SellerContext); 
    const navigate=useNavigate();
console.log(isLoggedIn);
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
  const handleStartSelling =() =>{
    if (isLoggedIn) {
      navigate("/product_details");
    } else {
      toast.info("Please Login");
    }
  }
  return (
    <SellerProvider>
      <div className="SellerNavbar">
        <SellerNav />
      </div>
      <div className="SellerMainContainer">
        <div className="MainContent">
          <div className="LeftMainContainer">
            <h1>Welcome to PrimeBuy Seller</h1>
            <h2>Start Selling to millions of customers</h2>
            <span onClick={handleStartSelling}>Start Selling</span>
            <h3>You will need only 3 things to start selling on PrimeBuy</h3>
            <div className="RequiredThingsImages">
              <div className="DataItems">
                <img src="https://m.media-amazon.com/images/G/31/selldot/icons/GSTIcon1.svg" />
                <p>GST Details</p>
              </div>
              <div className="DataItems">
                <img src="https://m.media-amazon.com/images/G/31/selldot/icons/PANIcon.svg" />
                <p>PAN Details</p>
              </div>
              <div className="DataItems">
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
};

export default SellerHome;
