import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../functions/functions"; // Assuming you have this file for API base URL

const RazorpayPayment = ({ amount, orderId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRazorpayPayment = async () => {
    setIsLoading(true);

    try {
      // Make an API call to your server to create an order in Razorpay
      const response = await axios.post(
        `${API_BASE}/create-razorpay-order`,
        {
          amount: amount,
          orderId: orderId,
        }
      );

      // Load the Razorpay checkout
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
        amount: response.data.amount,
        currency: "INR",
        name: "Your Store Name",
        description: "Purchase",
        order_id: response.data.id,
        handler: (response) => {
          // Handle the payment success response here
          console.log("Payment successful!", response);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      setIsLoading(false);
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={handleRazorpayPayment}>Pay with Razorpay</button>
      )}
    </div>
  );
};

export default RazorpayPayment;
