import React from "react";
import { Link } from "react-router-dom";
import "./LeftSideBar.css";
const LeftSideBar = () => {
  const data = [
    {
      data_item: "Home",
      link_to: "/seller",
    },
    {
      data_item: "Add Product Details",
      link_to: "/product_details",
    },
    {
      data_item: "Catalogue",
      link_to: "/catalogue",
    },
    {
      data_item: "Dashboard",
      link_to: "/seller_dashboard",
    },
    {
      data_item: "Orders",
      link_to: "/orders",
    },
  ];
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
};

export default LeftSideBar;
