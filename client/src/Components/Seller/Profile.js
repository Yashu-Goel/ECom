import React,{useState, useEffect} from 'react'
import './Profile.css'
import axios from "axios";
import LeftSideBar from './LeftSideBar'
import SellerNav from './SellerNav'
import SellerProvider from "./SellerProvider";
import { CgProfile } from "react-icons/cg";
import { API_BASE } from "../functions/functions";

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
      <div className="SellerMainContainer1">
        <h1>Profile</h1>
        <div className="ProfileMainContent">
          <div className="ProfileOuterContent1">
            <div className="ProfilePic1">
              <div>
                <CgProfile />
              </div>
              <h3>{sellerData.name}</h3>
            </div>
            <div className="ProfileInnerContent">
              <div className="ProfileDataItems">
                <p>
                  <b>Name:</b>
                </p>
                <span>{sellerData.name}</span>
              </div>
              <div className="ProfileDataItems">
                <p>
                  <b>E-mail ID:</b>
                </p>
                <span>{sellerData.email}</span>
              </div>
              <div className="ProfileDataItems">
                <p>
                  <b>Mobile Number:</b>
                </p>
                <span>{sellerData.mobile}</span>
              </div>
              <div className="ProfileDataItems">
                <p>GST:</p> <span>{sellerData.gst}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SellerProvider>
  );
}

export default Profile