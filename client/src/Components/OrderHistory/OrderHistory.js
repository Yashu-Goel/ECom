import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../functions/functions";
import "./OrderHistory.css";
import { UserState } from "../Context/UserProvider";
import ProductModal from "./ProductModal";
import BillModal from "../OrderConfirmationPage/BillModal";

const OrderHistory = () => {
  const [orderData, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);

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
          setOrders(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      getProductDetails();
    }
  }, [user]);
  return (
    <div class="table-wrapper">
      <div class="table-row table-header">
        <div class="col-wrapper order-date-number-po">
          <div class="table-col order-date">Order Date</div>
          <div class="table-col order-number1">Order Id #</div>
        </div>

        <div class="col-wrapper order-year-model-customer">
          <div class="table-col order-customer">Product Details</div>
        </div>

        <div class="col-wrapper order-status-signed">
          <div class="table-col order-status">Status</div>
        </div>

        <div class="col-wrapper order-status-signed">
          <div class="table-col order-status">Payment</div>
        </div>
      </div>
      {orderData.map((order) => {
        // Convert ISO 8601 formatted date string to JavaScript Date object
        const orderDate = new Date(order.orderDate);

        // Format the date and time in Indian format
        const formattedDate = orderDate.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return (
          <div class="table-row" key={order._id}>
            <div class="col-wrapper order-date-number-po">
              <div class="table-col order-date">{formattedDate}</div>
              <div class="table-col order-number1">
                {order.paymentDetails.order_id}
              </div>
            </div>

            <div class="col-wrapper order-year-model-customer">
              <div class="table-col order-customer">
                <button
                  onClick={() => {
                    if (!selectedProduct) setSelectedProduct(order.products);
                  }}
                >
                  View
                </button>
              </div>
            </div>

            <div class="col-wrapper order-status-signed">
              <div class="table-col order-status">Placed</div>
            </div>

            <div class="col-wrapper order-status-signed">
              <div class="table-col order-status">
                <button
                  onClick={() => {
                    if (!selectedBill) setSelectedBill(order.paymentDetails);
                  }}
                >
                  ₹{order.paymentDetails.amount / 100}
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {selectedProduct && (
        <ProductModal
          cart={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {selectedBill && (
        <BillModal
          bill={selectedBill}
          countDown={false}
          onClose={() => setSelectedBill(null)}
        />
      )}
    </div>
  );
};

export default OrderHistory;
