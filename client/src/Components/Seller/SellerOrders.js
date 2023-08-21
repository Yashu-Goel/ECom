import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SellerOrders.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SellerNav from "./SellerNav";
import { API_BASE } from "../functions/functions";
import Product from "./Modal/Product";
import Loading from "./Loading";
import Customer from "./Modal/Customer";

const SellerOrders = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };
  const openCustomerModal = (customer_address) => {
    setSelectedCustomer(customer_address);
    console.log("okokkk");
    console.log(customer_address);
  };

  const closeCustomerModal = () => {
    setSelectedCustomer(null);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    const fetchData = async () => {
      try {
        setLoading(true);
        const sellerId = localStorage.getItem("_id");

        if (!sellerId) {
          window.alert("Seller Id not found!!");
          return;
        }
        const response = await axios.get(
          API_BASE + `/seller/order_details/${sellerId}`
        );
        setOrderDetails(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
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
      if (response.status === 200) {
        setOrderDetails((prevOrderDetails) =>
          prevOrderDetails.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Status updated");
      } else {
        toast.error("Updating Status Error");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="SellerOrderOuterContainer">
          {selectedProduct && (
            <Product product={selectedProduct} onClose={closeProductModal} />
          )}
          {selectedCustomer && (
            <Customer
              customer_address={selectedCustomer}
              onClose={closeCustomerModal}
            />
          )}
          <div className="SellerNavContainer" style={{ width: width }}>
            <SellerNav />
          </div>
          <div className="OuterTableContainer">
            <table>
              <thead className="TableHeading">
                <tr>
                  <th className="TableHead">OrderID</th>
                  <th className="TableHead">Customer Details</th>
                  <th className="TableHead">Product Details</th>
                  <th className="TableHead">Date of Order</th>
                  <th className="TableHead">Quantity</th>
                  <th className="TableHead">Product Status</th>
                </tr>
              </thead>
              <tbody className="TableBody">
                {orderDetails.map((order) => {
                  const {
                    _id,
                    orderNumber,
                    customer_address: { name, street, city, state, zip, phone },
                    productId: {
                      brand,
                      model,
                      name: productName,
                      category,
                      pics,
                      price,
                    },
                    date,
                    count,
                    status,
                  } = order;
                  return (
                    <tr key={orderNumber}>
                      <td className="TableHead">{orderNumber}</td>
                      <td className="TableHead">
                        <button
                          onClick={() =>
                            openCustomerModal(order.customer_address)
                          }
                        >
                          View
                        </button>
                      </td>
                      <td className="TableHead">
                        <button
                          onClick={() => openProductModal(order.productId)}
                        >
                          View
                        </button>
                      </td>
                      <td className="TableHead">
                        {new Date(date).toLocaleDateString()}
                      </td>
                      <td className="TableHead">{count}</td>
                      <td className="TableHead">
                        <select
                          value={status}
                          onChange={(e) =>
                            handleProductStatusChange(_id, e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="shipped">Shipped</option>
                          <option value="out_for_delivery">
                            Out of Delivery
                          </option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerOrders;
