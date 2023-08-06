// import React, { useState,useEffect } from "react";
import { UserState } from "../Context/UserProvider";
// import "./OrderConfirmationPage.css"; // Import the CSS file for styling
// import { useNavigate } from "react-router-dom";

// const OrderConfirmationPage = () => {
//   const [promoCode, setPromoCode] = useState("");
//   const [isLoading, setIsLoading] = useState(false); //
//   const { user, cart, selectedAddress } = UserState();

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("profile"));
//     // setAddresses(data.addresses);
//   }, []);
//   //update validation here
//   const { name, street, city, state, zip, phone } = {};

//   const handlePromoCodeChange = (event) => {
//     setPromoCode(event.target.value);
//   };

//   const handleApplyPromoCode = () => {
//     // Apply the promo code logic here
//     // You can use the promoCode value and perform necessary operations
//     // Update the total amount or display a message based on the promo code
//   };

//   const handleContinueToPayment = () => {
//     setIsLoading(true); // Set loading state to true
//     // Simulate loading delay with setTimeout
//     setTimeout(() => {
//       // Handle the logic to proceed to the payment page
//       // You can use the selectedAddress and cart data to process the payment
//       setIsLoading(false); // Set loading state to false once payment processing is done
//     }, 2000);
//   };
//   const calculateTotal = () => {
//     let total = 0;
//     cart.forEach((item) => {
//       total += item.price * item.cnt;
//     });
//     return Number(total);
//   };
//   const truncateName = (name) => {
//     if (name.length > 15) {
//       return name.slice(0, 20) + "...";
//     }
//     return name;
//   };
//   return (
//     <div className="order-confirmation-page">
//       <h1>Order Confirmation</h1>
//       <div className="order-summary">
//         <h2>Order Summary</h2>
//         <div className="table-responsive">
//           <table>
//             <thead>
//               <tr>
//                 <th>Product</th>
//                 <th>Quantity</th>
//                 <th>Price</th>
//                 <th>Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.map((item) => (
//                 <tr key={item.id}>
//                   <td>
//                     <div className="product-info">
//                       {/* <img
//                         src={require(`../TopSecHome/img_1/slider10Images/${item.pic}`)}
//                       /> */}
//                       <p>{truncateName(item.name)}</p>
//                     </div>
//                   </td>
//                   <td>{item.cnt}</td>
//                   <td>₹{item.price}</td>
//                   <td>₹{item.price * item.cnt}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="total-amount">
//           <p>Total: ₹{calculateTotal()}</p>
//         </div>
//       </div>
//       <div className="shipping-address">
//         <h3>Shipping Address</h3>
//         <div className="address-details">
//           <p className="name">{name}</p>
//           <p className="street">{street}</p>
//           <p>
//             {city}, {state} {zip}
//           </p>
//           <p>{phone}</p>
//         </div>
//       </div>

//       <div className="promo-code">
//         <h2>Apply Promo Code</h2>
//         <input
//           type="text"
//           value={promoCode}
//           onChange={handlePromoCodeChange}
//           placeholder="Enter promo code"
//         />
//         <button onClick={handleApplyPromoCode}>Apply</button>
//       </div>

//       <div className="buttons">
//         <button onClick={handleContinueToPayment}>Proceed to Payment</button>
//       </div>
//       {isLoading && (
//         <div className="loading-modal">
//           <div className="loading-spinner"></div>
//           <p>Processing payment...</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderConfirmationPage;
import React from "react";

const OrderConfirmationPage = () => {
  const { user, cart, selectedAddress } = UserState();
  console.log(selectedAddress)
  return <div>OrderConfirmationPage</div>;
};

export default OrderConfirmationPage;
