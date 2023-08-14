import React from "react";

const SellerOrders = () => {
  const orders = [
    {
      orderId: 123,
      customerName: "John Doe",
      productDetails: "Product A",
      dateOfOrder: "2023-08-14",
      productStatus: "Processing",
    },
    {
      orderId: 124,
      customerName: "Jane Smith",
      productDetails: "Product B",
      dateOfOrder: "2023-08-15",
      productStatus: "Shipped",
    },
    
    {
      orderId: 124,
      customerName: "Jane Smith",
      productDetails: "Product B",
      dateOfOrder: "2023-08-15",
      productStatus: "Shipped",
    },
    
    {
      orderId: 124,
      customerName: "Jane Smith",
      productDetails: "Product B",
      dateOfOrder: "2023-08-15",
      productStatus: "Shipped",
    },
  ];

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>OrderID</th>
            <th>Customer Name</th>
            <th>Product Details</th>
            <th>Date of Order</th>
            <th>Product Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.customerName}</td>
              <td>{order.productDetails}</td>
              <td>{order.dateOfOrder}</td>
              <td>{order.productStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerOrders;
