// import React, { useState } from "react";
// import axios from "axios";
// import { API_BASE } from "../functions/functions"; // Assuming you have this file for API base URL

// const RazorpayPayment = ({ amount, orderId }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleRazorpayPayment = async () => {
//     setIsLoading(true);

//     try {
//       // Make an API call to your server to create an order in Razorpay
//       const response = await axios.post(`${API_BASE}/create-razorpay-order`, {
//         amount: amount,
//         orderId: orderId,
//       });

//       // Load the Razorpay checkout
//       const options = {
//         key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
//         amount: response.data.amount,
//         currency: "INR",
//         name: "Your Store Name",
//         description: "Purchase",
//         order_id: response.data.id,
//         handler: (response) => {
//           // var settings = {
//           //   url: "/verify-signature",
//           //   method: "POST",
//           //   timeout: 0,
//           //   headers: {
//           //     "Content-Type": "application/json",
//           //   },
//           //   data: JSON.stringify({ response }),
//           // };
//           // console.log("signature", settings);
//           console.log("Payment successful!", response);
//           const paymentData = {
//             razorpay_order_id: orderData.id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           };
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();

//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error creating Razorpay order:", error);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <button onClick={handleRazorpayPayment}>Pay with Razorpay</button>
//       )}
//     </div>
//   );
// };

// export default RazorpayPayment;
