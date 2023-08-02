import React from "react";
import SellerNav from "./SellerNav";
import ReactApexChart from "react-apexcharts";
import "./SellerDashboard.css";

const SellerDashboard = () => {
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
      value: "2",
      text: "Total Products",
      color: "#8e44ad",
    },
  ];

  const order_data = [
    {
      text: "Total",
      value: "23",
    },
    {
      text: "Completed",
      value: "18",
    },
    {
      text: "Pending",
      value: "3",
    },
    {
      text: "Cancelled",
      value: "2",
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
