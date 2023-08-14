import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";
const SellerOrders = () => {

  const [orders, setOrders] = useState([]);
  const [productStatus, setProductStatus] = useState("Pending");
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
         setOrders(response.data);

         // Fetch product details for each order
         for (const order of response.data) {
           try {
             const product_response = await axios.get(
               API_BASE + `/seller/products/${order.productId}`
             );
             console.log(product_response.data); // Log product details
           } catch (error) {
             console.log("Error fetching product details: " + error);
           }
         }

         // Fetch product details for each order
         for (const order of response.data) {
           try {
             const customer_response = await axios.get(
               API_BASE + `/user/user_details/${order.customerId}`
             );
             console.log(customer_response.data); // Log product details
           } catch (error) {
             console.log("Error fetching product details: " + error);
           }
         }


       } else {
         window.alert("No orders found for this seller.");
       }
     } catch (error) {
       console.log("Error: " + error);
     }
   };
   fetchData();
 }, []);


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>OrderID</th>
            <th>Customer Name</th>
            <th>Customer Address</th>
            <th>Product Details</th>
            <th>Date of Order</th>
            <th>Quantity</th>
            <th>Product Status</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{new Date().toLocaleDateString()}</td>
              <td>
                <select
                  value={productStatus}
                  onChange={(e) => setProductStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default SellerOrders;
