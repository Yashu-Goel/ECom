import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../functions/functions";
import "./OrderHistory.css";
import { UserState } from "../Context/UserProvider";
import BillModal from "../OrderConfirmationPage/BillModal";
import TrackingModal from "./TrackingModal";
import RateModal from "./RateModal";
import { AWS_LINK } from "../IndividualProduct/function";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  toIndianCurrency,
  truncateName,
} from "../OrderConfirmationPage/function";
import { formatDate } from "./function";
import { toast } from "react-toastify";
import Loader2 from "../Loaders/Loader2";

const OrderHistory = () => {
  const { user } = UserState();
  const navigate = useNavigate();
  const [orderData, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(null);
  const [isloading, setisLoading] = useState(true);

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState(7);

  useEffect(() => {
    if (user) {
      setisLoading(true);
      const getProductDetails = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const response = await axios.get(
            `${API_BASE}/updateAddress/order-history?tillDate=${dateFilter}&status=${selectedFilter}`,
            config
          );
          const sortedOrders = response.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setOrders(sortedOrders);
        } catch (error) {
          toast.error("Failed to fetch orders");
          console.log(error);
        } finally {
          setisLoading(false);
        }
      };
      getProductDetails();
    }
  }, [user, dateFilter, selectedFilter]);

  const options = [
    { label: "Last week", dayCount: 7 },
    { label: "Past 3 months", dayCount: 90 },
    { label: "Last 6 months", dayCount: 180 },
    { label: "Current year", dayCount: 365 },
  ];
  return (
    <>
      <div className="order-history-container">
        <h1 className="order-history-header">Order History</h1>
        <h2>Your Orders</h2>
        <div className="filter-buttons">
          <div className="left-buttons">
            <button
              className={selectedFilter === "all" ? "active-btn" : ""}
              onClick={() => setSelectedFilter("all")}
            >
              Orders
            </button>
            <button
              className={selectedFilter === "pending" ? "active-btn" : ""}
              onClick={() => setSelectedFilter("pending")}
            >
              Not Yet Shipped
            </button>
            <button
              className={selectedFilter === "cancelled" ? "active-btn" : ""}
              onClick={() => setSelectedFilter("cancelled")}
            >
              Cancelled Orders
            </button>
          </div>
          <div className="right-buttons">
            <select
              id="filterSelect"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              {options.map((option) => (
                <option key={option.dayCount} value={option.dayCount}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="order-list">
          {isloading && <Loader2 content="Fetching orders.." />}
          {!isloading && orderData?.length === 0 && (
            <div className="no-order-found">
              <h1>No orders found!</h1>
            </div>
          )}
          {!isloading &&
            orderData?.map((order) => {
              const { name, street, city, state, zip, phone } =
                order.customer_address;
              return (
                <div className="order-history-item" key={order._id}>
                  <div className="order-history-summary">
                    <div className="order-history-details">
                      <div className="order-placed">
                        <p>Order Placed:</p>
                        <strong>{formatDate(order.date)}</strong>
                      </div>

                      <div className="order-total">
                        <p>Total:</p>
                        <div className="item-price">
                          {toIndianCurrency(order.amount)}
                        </div>
                      </div>

                      <button
                        class="ship-to-button"
                        data-address={`${name}, ${street}, ${city}, ${state}, ${zip}, ${phone}`}
                      >
                        <p>Ship to:</p>
                        <strong>{name}</strong>
                      </button>
                    </div>

                    <div className="order-id">
                      <p>
                        <strong>ORDER #: {order.orderNumber}</strong>
                      </p>

                      <div className="order-actions">
                        <button
                          className="view-button"
                          onClick={() => {
                            if (!selectedBill) {
                              setSelectedBill(order);
                            }
                          }}
                        >
                          View Invoice
                        </button>
                        <button
                          className="view-button"
                          onClick={() => {
                            setShowTrackingModal(order);
                          }}
                        >
                          Track Product
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="order-history-second">
                    <div className="product-order-history-details">
                      <div className="order-status">
                        {order.currentStatus === "pending" && (
                          <p className="status-pending">
                            Order placed on {formatDate(order.date)}
                          </p>
                        )}
                        {order.currentStatus === "shipped" && (
                          <p className="status-shipped">
                            Order shipped on {formatDate(order.shippedDate)}
                          </p>
                        )}
                        {order.currentStatus === "out_for_delivery" && (
                          <p className="status-out-for-delivery">
                            Arriving today.
                          </p>
                        )}
                        {order.currentStatus === "delivered" && (
                          <p className="status-delivered">
                            Delivered on {formatDate(order.deliveredDate)}
                          </p>
                        )}
                        {order.currentStatus === "cancelled" && (
                          <p className="status-cancelled">
                            Your order has been cancelled!
                          </p>
                        )}
                      </div>

                      <div className="first-second-part">
                        <div className="product-image">
                          <Link
                            to={`/product/${order.productId._id}`}
                            className="product-link"
                          >
                            <img
                              src={`${AWS_LINK}/${order.productId.imageName[0]}`}
                              alt={`${order.productId.name}`}
                            />
                          </Link>
                        </div>

                        <div className="product-info">
                          <Link
                            to={`/product/${order.productId._id}`}
                            className="product-link"
                          >
                            <strong>
                              {truncateName(order.productId.name)}
                            </strong>{" "}
                            <strong>{order.productId.brand}</strong>{" "}
                            <strong>{order.productId.model}</strong>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="miscell-button">
                      {order.currentStatus === "delivered" ? (
                        <button
                          className="rate-button"
                          onClick={() => {
                            setIsRateModalOpen(true);
                            setSelectedProduct(order.productId);
                          }}
                        >
                          <span className="button-icon">⭐️</span> Review
                          Product
                        </button>
                      ) : null}

                      {order.currentStatus !== "delivered" &&
                      order.currentStatus !== "cancelled" ? (
                        <button className="cancel-button" onClick={() => {}}>
                          <span className="button-icon">❌</span> Cancel Order
                        </button>
                      ) : null}

                      <button
                        className="buy-again-button"
                        onClick={() => {
                          navigate(`/product/${order.productId._id}`);
                        }}
                      >
                        <span className="button-icon">🛒</span> Buy Again
                      </button>

                      <button
                        className="contact-seller-button"
                        onClick={() => {}}
                      >
                        <span className="button-icon">📞</span> Contact the
                        Seller
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {selectedBill && (
          <BillModal
            bill={selectedBill}
            countDown={false}
            onClose={() => setSelectedBill(null)}
          />
        )}
        {isRateModalOpen && (
          <RateModal
            products={selectedProduct}
            onClose={() => setIsRateModalOpen(false)}
          />
        )}
        {showTrackingModal && (
          <TrackingModal
            order={showTrackingModal}
            onClose={() => setShowTrackingModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default OrderHistory;
