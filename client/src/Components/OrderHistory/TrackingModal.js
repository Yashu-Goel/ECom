import React from "react";
import "./TrackingModal.css";
import { AWS_LINK } from "../IndividualProduct/function";

const TrackingModal = ({ order, onClose }) => {
  const formatDate = (date) => {
    const orderDate = new Date(date);

    const formattedDate = orderDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return formattedDate;
  };

  return (
    <div className="rate-modal-container">
      <div className="rate-modal">
        <figure>
          <img
            src={`${AWS_LINK}/${order.productId.imageName[0]}`}
            alt={`${order.productId.name}`}
          />
          <figcaption>
            <strong>{order.productId.name}</strong>
            <strong>{order.orderNumber}</strong>
            <strong>₹ {order.amount}</strong>
          </figcaption>
        </figure>

        <div class="order-track">
          <div class="order-track-step">
            <div class="order-track-status">
              <span class="order-track-status-dot active-dot"></span>
              <span
                className={
                  order.shipped
                    ? "order-track-status-line"
                    : "order-track-status-line partial-line"
                }
              ></span>
            </div>
            <div class="order-track-text">
              <p class="order-track-text-stat">Order placed</p>
              <span class="order-track-text-sub">{formatDate(order.date)}</span>
            </div>
          </div>

          <div className="order-track-step">
            <div className="order-track-status">
              <span
                className={
                  order.shipped
                    ? "order-track-status-dot active-dot"
                    : "order-track-status-dot"
                }
              ></span>

              {order.shipped && (
                <span
                  className={
                    order.outForDelivery
                      ? "order-track-status-line"
                      : "order-track-status-line partial-line"
                  }
                ></span>
              )}
            </div>
            <div className="order-track-text">
              <p className="order-track-text-stat">Order Shipped</p>
              {order.shipped ? (
                <span class="order-track-text-sub">
                  {formatDate(order.date)}
                </span>
              ) : (
                <span className="order-track-text-sub">NA</span>
              )}
            </div>
          </div>

          <div className="order-track-step">
            <div className="order-track-status">
              <span
                className={
                  order.outForDelivery
                    ? "order-track-status-dot active-dot"
                    : "order-track-status-dot"
                }
              ></span>
              {order.outForDelivery && (
                <span
                  className={
                    order.delivered
                      ? "order-track-status-line"
                      : "order-track-status-line partial-line"
                  }
                ></span>
              )}
            </div>
            <div className="order-track-text">
              <p className="order-track-text-stat">Order out for delivery</p>
              {order.outForDelivery ? (
                <span className="order-track-text-sub">
                  {formatDate(order.outForDeliveryDate)}
                </span>
              ) : (
                <span className="order-track-text-sub">NA</span>
              )}
            </div>
          </div>

          <div className="order-track-step">
            <div className="order-track-status">
              <span
                className={
                  order.delivered
                    ? "order-track-status-dot active-dot"
                    : "order-track-status-dot"
                }
              ></span>
            </div>
            <div className="order-track-text">
              <p className="order-track-text-stat">Delivered</p>
              {order.outForDelivery ? (
                <span className="order-track-text-sub">
                  {formatDate(order.outForDeliveryDate)}
                </span>
              ) : (
                <span className="order-track-text-sub">NA</span>
              )}
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
