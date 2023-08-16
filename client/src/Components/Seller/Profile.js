import React,{useState, useEffect} from 'react'
import './Profile.css'
import axios from "axios";
import LeftSideBar from './LeftSideBar'
import SellerNav from './SellerNav'
import SellerProvider from "./SellerProvider";
const API_BASE = "http://localhost:5000";
const Profile = () => {

const [sellerData, setSellerData] = useState([]);
const [flag, setFlag] = useState(0);

useEffect(() => {
  (async () => {
    try {
      const sellerId = localStorage.getItem("_id");
      console.log('sellerid: '+ sellerId);
      const response = await axios.get(
        API_BASE + `/seller/seller_details/${sellerId}`
      );
      setSellerData(response.data); 

      console.log("sellerData:", response.data); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  })();
}, []);

  return (
    <SellerProvider>
      <div className="SellerNavbar">
        <SellerNav />
      </div>
      <div className="SellerMainContainer">
        <div className="ProfileMainContent">
          <h1>Profile</h1>
          <div className="ProfileInnerContent">
            <div className="ProfileDataItems">
              <p>Name:</p> <span>{sellerData.name}</span>
            </div>
            <div className="ProfileDataItems">
              <p>E-mail ID:</p> <span>{sellerData.email}</span>
            </div>
            <div className="ProfileDataItems">
              <p>Mobile Number:</p> <span>{sellerData.mobile}</span>
            </div>
            <div className="ProfileDataItems">
              <p>GST:</p> <span>{sellerData.gst}</span>
            </div>
          </div>
        </div>
      </div>
    </SellerProvider>
  );
}

export default Profile