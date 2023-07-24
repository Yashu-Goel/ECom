import React from 'react'
import {Link} from 'react-router-dom'
import './LeftSideBar.css'
const LeftSideBar = () => {
    const data = [
        {
            data_item: "Add Product Details",
            link_to:"/product_details"
        },
        {
            data_item: "Catalogue",
            link_to:"/catalogue"
        }
    ]

  return (
    <div className="SellerLeftSideBarMain">
      <div className="DataItems">
        {data.map((item, index) => (
          <Link to={item.link_to} key={index}>
            <div className="DataItem">
              <p>{item.data_item}</p>
              <span>&gt;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LeftSideBar