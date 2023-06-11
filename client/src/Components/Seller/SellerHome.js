import React from 'react'
import LeftSideBar from './LeftSideBar'
import SellerNav from './SellerNav'
import './SellerHome.css'
const SellerHome = () => {
  return (
    <>
    <div className='SellerNavbar'><SellerNav/></div>
      <div className="SellerMainContainer">
        <div className="LeftSideBar">
          <LeftSideBar />
        </div>
        <div className="MainContent">Main Content like how to add product detials, etc</div>
      </div>
    </>
  );
}

export default SellerHome