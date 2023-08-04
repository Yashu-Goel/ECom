import React,{useState, useEffect} from "react";
import SellerNav from "./SellerNav";
import ReactApexChart from "react-apexcharts";
import axios from 'axios'
import "./SellerDashboard.css";
const API_BASE = "http://localhost:5000";

const SellerDashboard = () => {

    const [length, setLength]=useState(0)
useEffect(() => {
  (async () => {
    try {
      const sellerId = localStorage.getItem("_id");
      const response = await axios.get(
        API_BASE + `/seller/products?sellerId=${sellerId}`
      );
      if (response.data.length>0)
      {
        setLength(response.data.length);
      } console.log("Length:", response.data.length); // Log the response.data directly
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  })();
}, []);
  
  const data = [
    {
      value: "₹ 2,000",
      text: "Credit Amount",
      color: "#e7505a",
    },
    {
      value: "₹ 40,000",
      text: "Total Sales",
      color: "#3598dc",
    },
    {
      value: "23",
      text: "Total Orders",
      color: "#32c5d2",
    },
    {
      value: length,
      text: "Total Products",
      color: "#8e44ad",
    },
  ];

  const order_data = [
    {
      text: "Total",
      value: length,
    },
    {
      text: "Completed",
      value: 0,
    },
    {
      text: "Pending",
      value: 0,
    },
    {
      text: "Cancelled",
      value: 0,
    },
  ];

   const pieChartData = {
     series: order_data.map((item) => Number(item.value)),
     options: {
       labels: order_data.map((item) => item.text),
       colors: ["#e7505a", "#3598dc", "#32c5d2", "#8e44ad"],
     },
   };
  return (
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
            {order_data.map((item, index) => (
              <div key={index} className="OrderDataItem">
                <p>
                  {item.text}  <p>{item.value}</p>
                </p>
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
  );
};

export default SellerDashboard;
