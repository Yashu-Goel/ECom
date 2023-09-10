import React, { useState, useEffect } from "react";
import SellerNav from "./SellerNav";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import "./SellerDashboard.css";
import Loading from "./Loading";
const API_BASE = "http://192.168.0.103:5000";

const SellerDashboard = () => {
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
        setLoading(true)
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
        let out_for_delivery=0;
        order_response.data.forEach((order) => {
          if (order.currentStatus === "delivered") {
            completedOrders = completedOrders + parseInt(order.count);
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
        console.log(completedOrders);
        let totalOrders = 0;
        let totalSales = 0;

        order_response.data.forEach((order) => {
          totalOrders += parseInt(order.count);
          totalSales += parseInt(order.amount);
        });

        const creditAmount = Math.floor(totalSales * 0.98);

        setOrderDetails(order_response.data);
        setTotalOrders(totalOrders);
        setTotalSales(totalSales);
        setCreditAmount(creditAmount);

        const updatedOrderData = [
          {
            text: "Total: ",
            value: totalOrders,
          },
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
          }
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
      color: "#e7505a",
    },
    {
      value: `₹ ${totalSales}`,
      text: "Total Sales",
      color: "#3598dc",
    },
    {
      value: totalOrders,
      text: "Total Orders",
      color: "#32c5d2",
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
      colors: [
        "#e7505a",
        "#3598dc",
        "#32c5d2",
        "#8e44ad",
        "#55DD33",
        "#F28C28",
      ],
    },
  };

  return (
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
            <div>
              <p className="OrderHeading">Orders</p>
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
    </div>
  );
};

export default SellerDashboard;
