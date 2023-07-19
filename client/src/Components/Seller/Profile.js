import React from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import LeftSideBar from './LeftSideBar'
import SellerNav from './SellerNav'
import SellerProvider from "./SellerProvider";

const Profile = () => {
  return (
    <SellerProvider>
      <div className="SellerNavbar">
        <SellerNav />
      </div>
      <div className="SellerMainContainer">
        <div className="LeftSideBar">
          <LeftSideBar />
        </div>
        <div className="ProfileMainContent">
          Profile
          
        </div>
      </div>
    </SellerProvider>
  );
}

export default Profile