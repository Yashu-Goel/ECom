import React, { useState } from "react";
import "./TrackingModal.css";
import { getFileNameFromPath } from "../IndividualProduct/function";

const TrackingModal = ({ order, onClose }) => {
  console.log(order);
  return (
    <div className="rate-modal-container">
      <div className="rate-modal">
        <figure>
          <img
            src={
              process.env.PUBLIC_URL +
              "/uploads/" +
              getFileNameFromPath(order.productId.pics[0])
            }
            alt={`${order.productId.name}`}
          />
          <figcaption>
            <h4>{order.productId.name}</h4>
            <h6>{order.productId.category}</h6>
            <h2>₹ {order.amount}</h2>
          </figcaption>
        </figure>
        <div class="order-track">
          <div class="order-track-step">
            <div class="order-track-status">
              <span class="order-track-status-dot"></span>
              <span class="order-track-status-line"></span>
            </div>
            <div class="order-track-text">
              <p class="order-track-text-stat">Order Placed</p>
              <span class="order-track-text-sub">21st November, 2019</span>
            </div>
          </div>
          <div class="order-track-step">
            <div class="order-track-status">
              <span class="order-track-status-dot"></span>
              <span class="order-track-status-line"></span>
            </div>
            <div class="order-track-text">
              <p class="order-track-text-stat">Order Shipped</p>
              <span class="order-track-text-sub">21st November, 2019</span>
            </div>
          </div>

          <div class="order-track-step">
            <div class="order-track-status">
              <span class="order-track-status-dot"></span>
              <span class="order-track-status-line"></span>
            </div>
            <div class="order-track-text">
              <p class="order-track-text-stat">Order out for delivery</p>
              <span class="order-track-text-sub">21st November, 2019</span>
            </div>
          </div>

          <div class="order-track-step">
            <div class="order-track-status">
              <span class="order-track-status-dot"></span>
              <span class="order-track-status-line"></span>
            </div>
            <div class="order-track-text">
              <p class="order-track-text-stat">Order Delivered</p>
              <span class="order-track-text-sub">21st November, 2019</span>
            </div>
          </div>
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TrackingModal;
