import React, { useState, useEffect, useContext } from "react";
import SellerNav from "./SellerNav";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import "./SellerDashboard.css";
import Loading from "./Loading";
import { API_BASE } from "../functions/functions";
import ErrorPage from "./Modal/ErrorPage";
import { SellerContext } from "./SellerProvider";
const SellerDashboard = () => {
    const { isLoggedIn, toggleLoginStatus, logout } = useContext(SellerContext); 

  const [length, setLength] = useState(0);
  const [orderDetails, setOrderDetails] = useState([]); // Combining order, product, and customer data
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [creditAmount, setCreditAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState([
    {
      text: "Total",
      value: 0,
    },
    {
      text: "Completed",
      value: 0,
    },
    {
      text: "Shipped",
      value: 0,
    },
    {
      text: "Pending",
      value: 0,
    },
  ]);

useEffect(() => {
  (async () => {
    try {
      setLoading(true);
      const sellerId = localStorage.getItem("_id");
      const response = await axios.get(
        API_BASE + `/seller/products?sellerId=${sellerId}`
      );
      if (response.data.length > 0) {
        setLength(response.data.length);
      }

      const order_response = await axios.get(
        API_BASE + `/seller/order_details/${sellerId}`
      );
      console.log(order_response.data);
      let completedOrders = 0;
      let shippedOrders = 0;
      let pendingOrders = 0;
      let cancelledOrders = 0;
      let out_for_delivery = 0;
      let totalSales = 0; // Initialize totalSales here

      order_response.data.forEach((order) => {
        if (order.currentStatus === "delivered") {
          completedOrders = completedOrders + parseInt(order.count);
          totalSales += parseInt(order.amount); // Add to totalSales when delivered
        } else if (order.currentStatus === "shipped") {
          shippedOrders = shippedOrders + parseInt(order.count);
        } else if (order.currentStatus === "out_for_delivery") {
          out_for_delivery = out_for_delivery + parseInt(order.count);
        } else if (order.currentStatus === "pending") {
          pendingOrders = pendingOrders + parseInt(order.count);
        } else if (order.currentStatus === "cancelled") {
          cancelledOrders = cancelledOrders + parseInt(order.count);
        }
      });

      // Calculate credit amount based on total sales
      const creditAmount = Math.floor(totalSales * 0.98);

      setOrderDetails(order_response.data);
      setTotalOrders(
        completedOrders +
          shippedOrders +
          out_for_delivery +
          pendingOrders +
          cancelledOrders
      );
      setTotalSales(totalSales);
      setCreditAmount(creditAmount);

      const updatedOrderData = [
        {
          text: "Completed: ",
          value: completedOrders,
        },
        {
          text: "Shipped: ",
          value: shippedOrders,
        },
        {
          text: "Pending",
          value: pendingOrders,
        },
        {
          text: "Cancelled: ",
          value: cancelledOrders,
        },
        {
          text: "Out for Delivery: ",
          value: out_for_delivery,
        },
      ];
      setOrderData(updatedOrderData);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  })();
}, []);


  const data = [
    {
      value: `₹ ${creditAmount}`,
      text: "Credit Amount",
      color: "#f0284a",
    },
    {
      value: `₹ ${totalSales}`,
      text: "Total Sales",
      color: "#1877f2",
    },
    {
      value: totalOrders,
      text: "Total Orders",
      color: "#2abba7",
    },
    {
      value: length,
      text: "Total Products",
      color: "#8e44ad",
    },
  ];

  const pieChartData = {
    series: orderData.map((item) => Number(item.value)),
    options: {
      labels: orderData.map((item) => item.text),
      colors: ["#f0284a", "#1877f2", "#F28C28", "#8e44ad", "#55DD33"],
    },
  };

  return (
    <>
    {isLoggedIn ? (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <SellerNav />
            <h1 className="DashboardHeading">Dashboard</h1>
            <div className="DashboardDataItems">
              {data.map((item, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: item.color }}
                  className="DashboardDataItem"
                >
                  <p>{item.value}</p>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <div className="OrdersMainContainer">
              <div className="OrderHeadingOuter">
                <p className="OrderHeading">Orders</p>
                <p>kerfgwvrtejrwntbk hneuvorhimdfg tgf;oirjerhvre</p>
              </div>
              <div className="OrderInnerContainer">
                <div className="OrderDataItems">
                  {orderData.map((item, index) => (
                    <div key={index} className="OrderDataItem">
                      <p>{item.text}</p>
                      <p id="value">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="PieChart">
                  <ReactApexChart
                    options={pieChartData.options}
                    series={pieChartData.series}
                    type="pie"
                    width="380"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>):(
        <ErrorPage/>
      )}
    </>
  );
};

export default SellerDashboard;
