import React, { useState } from "react";
import "./OrderHistory.css";

const OrderHistory = () => {
  // Sample data for demonstration purposes
  const orders = [
    {
      id: 1,
      deliveryDate: "15-07-2023",
      totalAmount: "14,999",
      shippedTo: {
        name: "Yashu Goel",
        address: "123 New Delhi Pitam Pura, City, Country",
      },
      productId: "ABC123",
      productName:
        "FLower pot with full of grass and other candimums and son on hji",
      productPhoto: "slider12.webp",
      rating: 4,
    },
  ];

  const [tooltipAddress, setTooltipAddress] = useState("");

  const handleTooltipHover = (address) => {
    setTooltipAddress(address);
  };

  return (
    <div className="order-history-container">
      <h1 className="page-heading">Order History</h1>
      {orders.map((order) => (
        <div className="order-item" key={order.id}>
          <div className="order-info-top">
            <p className="delivery-date">
              ORDER PLACED <br></br> {order.deliveryDate}
            </p>
            <p className="total-amount">
              TOTAL <br></br> ₹{order.totalAmount}
            </p>
            <div
              className="shipped-to"
              onMouseEnter={() => handleTooltipHover(order.shippedTo.address)}
              onMouseLeave={() => handleTooltipHover("")}
            >
              SHIP TO<br></br> {order.shippedTo.name}
            </div>
            <p className="order-id">
              ORDER <br />
              <a href={`/order-details/${order.id}`}># {order.productId}</a>
            </p>
          </div>

          <div className="order-info-bottom">
            <img
              src={require(`../TopSecHome/img_1/${order.productPhoto}`)}
              className="product-photo"
              alt={order.productName}
            />
            <p className="product-name">{order.productName}</p>
            <div className="order-history-btns">
              <button className="rate-button">Review Product</button>
              <button className="rate-button support">Product Support</button>
            </div>
          </div>
          {tooltipAddress && (
            <div className="tooltip">
              <p>{tooltipAddress}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
