import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../functions/functions";
import "./OrderHistory.css";
import { UserState } from "../Context/UserProvider";
import ProductModal from "./ProductModal";
import BillModal from "../OrderConfirmationPage/BillModal";
import RateModal from "./RateModal";

const OrderHistory = () => {
  const [orderData, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);

  const { user } = UserState();
  useEffect(() => {
    if (user) {
      const getProductDetails = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const response = await axios.get(
            API_BASE + "/updateAddress/order-history",
            config
          );
          const sortedOrders = response.data.sort(
            (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
          );
          setOrders(sortedOrders);
        } catch (error) {
          console.log(error);
        }
      };

      getProductDetails();
    }
  }, [user]);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSortClick = () => {
    // Implement the sorting logic here
  };

  return (
    <>
      <div className="order-history-container">
        <h1 className="order-history-header">Order History</h1>
        <h2>Your Orders</h2>
        {/* //filter button */}
        <div className="filter-buttons">
          <div className="left-buttons">
            <button
              className={selectedFilter === "all" ? "active-btn" : ""}
              onClick={() => handleFilterClick("all")}
            >
              Orders
            </button>
            <button
              className={selectedFilter === "not-shipped" ? "active-btn" : ""}
              onClick={() => handleFilterClick("not-shipped")}
            >
              Not Yet Shipped
            </button>
            <button
              className={selectedFilter === "cancelled" ? "active-btn" : ""}
              onClick={() => handleFilterClick("cancelled")}
            >
              Cancelled Orders
            </button>
          </div>
          <div className="right-buttons">
            <button
              className={selectedFilter === "past-3-months" ? "active-btn" : ""}
              onClick={() => handleFilterClick("past-3-months")}
            >
              Past 3 Months
            </button>
          </div>
        </div>
        {/* each div */}
        <div className="order-list">
          {orderData.map((order) => {
            const orderDate = new Date(order.orderDate);

            const formattedDate = orderDate.toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            return (
              <div className="order-history-item" key={order._id}>
                <div className="order-history-summary">
                  <div className="order-history-details">
                    <div className="order-placed">
                      <p>Order Placed:</p>
                      <strong>{formattedDate}</strong>
                    </div>

                    <div className="order-total">
                      <p>Total:</p>
                      <strong>₹{order.paymentDetails.amount / 100}</strong>
                    </div>

                    <button className="ship-to-button">
                      <p>Ship to:</p>
                      <strong>{order.shippingDetails.name}</strong>
                    </button>

                    <div>
                      <p>Status</p>
                      <button className="view-button">Pending</button>
                    </div>
                  </div>

                  <div className="order-id">
                    <p>
                      <strong>Order #: {order.paymentDetails.order_id}</strong>
                    </p>
                    <div className="order-actions">
                      <button
                        className="view-button"
                        onClick={() => {
                          setOpenProductModal(true);
                          setSelectedProduct(order.products);
                        }}
                      >
                        View Order Details
                      </button>
                      <button
                        className="view-button"
                        onClick={() => {
                          if (!selectedBill)
                            setSelectedBill(order.paymentDetails);
                        }}
                      >
                        View Invoice
                      </button>
                    </div>
                  </div>
                </div>

                <div className="miscell-button">
                  <button
                    className="rate-button"
                    onClick={() => {
                      setIsRateModalOpen(true);
                      setSelectedProduct(order.products);
                    }}
                  >
                    <span className="rate-button-icon">⭐️</span> Rate Order
                  </button>
                  <button className="cancel-button" onClick={() => {}}>
                    Cancel Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {openProductModal && (
          <ProductModal
            cart={selectedProduct}
            onClose={() => setOpenProductModal(false)}
          />
        )}
        {selectedBill && (
          <BillModal
            bill={selectedBill}
            countDown={false}
            onClose={() => setSelectedBill(null)}
          />
        )}
        {isRateModalOpen && (
          <RateModal
            products={selectedProduct} // Pass the products array to the modal
            onClose={() => setIsRateModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default OrderHistory;
