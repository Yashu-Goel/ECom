import React, { useEffect, useState } from "react";
import axios from "axios";
import './SellerOrders.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = "http://localhost:5000";

const SellerOrders = () => {
  const [orderDetails, setOrderDetails] = useState([]); // Combining order, product, and customer data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sellerId = localStorage.getItem("_id");
        if (!sellerId) {
          window.alert("Seller Id not found!!");
          return;
        }
        const response = await axios.get(
          API_BASE + `/seller/order_details/${sellerId}`
        );
        if (response.data && response.data.length > 0) {
          // Fetch product and customer details for each order
          const combinedData = await Promise.all(
            response.data.map(async (order) => {
              const product_response = await axios.get(
                API_BASE + `/seller/products/${order.productId}`
              );

              const customer_response = await axios.get(
                API_BASE + `/user/user_details/${order.customerId}`
              );

              return {
                orderId: order._id,
                date: order.date,
                quantity:order.count,
                productName: product_response.data.name,
                productBrand: product_response.data.brand,
                productModel: product_response.data.model,
                customerName: customer_response.data.name,
                customerStreet: customer_response.data.addresses[0].street,
                customerCity: customer_response.data.addresses[0].city,
                customerState: customer_response.data.addresses[0].state,
                productStatus: order.status, 
              };
            })
          );
          
          setOrderDetails(combinedData);
        } else {
          window.alert("No orders found for this seller.");
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    fetchData();
  }, []);

  const handleProductStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(API_BASE + `/seller/order_details`, {
        id: orderId,
        status: newStatus,
      });
      toast.success("Status updated")
      if (response.status === 200) {
        setOrderDetails((prevOrderDetails) =>
          prevOrderDetails.map((order) =>
            order.orderId === orderId
              ? { ...order, productStatus: newStatus }
              : order
          )
        );
        
      } else {
        toast.error("Updating Status Error");
        console.log("Error updating order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  return (
    <div>
      <table>
        <thead className="TableHeading">
          <tr>
            <th className="TableHead">OrderID</th>
            <th className="TableHead">Customer Name</th>
            <th className="TableHead">Customer Address</th>
            <th className="TableHead">Product Details</th>
            <th className="TableHead">Date of Order</th>
            <th className="TableHead">Quantity</th>
            <th className="TableHead">Product Status</th>
          </tr>
        </thead>
        <tbody className="TableBody">
          {orderDetails.map((order) => (
            <tr key={order.orderId}>
              <td className="TableHead">{order.orderId}</td>
              <td className="TableHead">{order.customerName}</td>
              <td className="TableHead">{`${order.customerStreet}, ${order.customerCity}, ${order.customerState}`}</td>
              <td className="TableHead">{`${order.productBrand} - ${order.productModel} ${order.productName}`}</td>
              <td className="TableHead">{new Date(order.date).toLocaleDateString()}</td>
              <td className="TableHead">{order.quantity}</td>
              <td className="TableHead">
                <select
                  value={order.productStatus}
                  onChange={(e) =>
                    handleProductStatusChange(order.orderId, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
};

export default SellerOrders;
