import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { UserState } from "../Context/UserProvider";
import axios from "axios";
import { API_BASE } from "../functions/functions";
import "./OrderConfirmationPage.css";
import { truncateName, calculateTotal } from "./function";
import { getFileNameFromPath } from "../IndividualProduct/function";
import Error from "./Error";
import ProgressBar from "../ProceedToCheckOut/ProgressBar";
import Loading from "../Loaders/Loading";

const OrderConfirmationPage = () => {
  const [promoCode, setPromoCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [address, setAddress] = useState({});
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState();
  const { user, cart } = UserState();

  useEffect(() => {
    setIsLoading(true);
    const fetchUserId= async () => {
      try {
        const userEmail = JSON.parse(localStorage.getItem("profile"));
        console.log(userEmail.email);
        if(!userEmail.email)
        {
          toast.error("Email id not found");
          return
        }
       const response = await axios.post(API_BASE+
         "/user/userid",
         {
           email: userEmail.email,
         }
       );
       
        setUserId(response.data); 

        console.log("ID:", response.data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchUserId();
    const address = JSON.parse(localStorage.getItem("address"));
    if (!address) {
      toast.error("Address not found");
      return;
    } else if (!user) {
      toast.error("Failed to authenticate");
      return;
    } else {
      if (cart.length < 1) {
        toast.error("Cart is empty");
        return;
      }
      setAddress(address);
      setProceed(true);
    }

    const getProductDetails = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      try {
        const cartDetails = await Promise.all(
          cart.map(async (item) => {
            const response = await axios.get(
              API_BASE + `/cart/getCartInfo/${item._id}`,
              config
            );
            return {
              product: response.data,
              count: item.count,
            };
          })
        );
        setProducts(cartDetails);
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    };
    getProductDetails();
    setIsLoading(false);
  }, [cart]);

  const handleApplyPromoCode = () => {
    // Apply the promo code logic here
    // You can use the promoCode value and perform necessary operations
    // Update the total amount or display a message based on the promo code
  };
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve();
      } else {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = resolve;
        document.body.appendChild(script);
      }
    });
  };
  const handleContinueToPayment = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await loadRazorpay();
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.post(
          API_BASE + "/create-razorpay-order",
          {
            amount: calculateTotal(products),
          },
          config
        );

        const orderId = response.data.id;

        const options = {
          key: "rzp_test_LSiKQ94s76cQTy",
          amount: calculateTotal(products) * 100, // Amount in paise
          currency: "INR",
          name: "PrimeBuy",
          description: "Payment for Order",
          order_id: orderId,
          handler: async function (response) {
            const paymentData = {
              razorpay_order_id: orderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            try {
              const verifyResponse = await axios.post(
                `${API_BASE}/verify-payment/capture/${response.razorpay_payment_id}`,
                {
                  amount: calculateTotal(products) * 100,
                }
              );
              // console.log(verifyResponse.data);
            } catch (error) {
              console.log(error);
              // console.error("Payment verification error:", error.response.data);
            }
             try {
               for (const product of products) {
                 const orderDetails = {
                   sellerId: product.product.sellerId,
                   productId: product.product._id,
                   customerId: userId,
                   amount: product.product.price,
                   count: product.count,
                   date: new Date().toISOString().split("T")[0],
                 };
                 const config = {
                   headers: {
                     "Content-type": "application/json",
                     Authorization: `Bearer ${user.token}`,
                   },
                 };
                 try {
                   const { data } = await axios.post(
                     API_BASE + "/seller/order_details",
                     orderDetails,
                     config
                   );
                    console.log('Success');
                   toast.success("Order details sent to seller");
                 } catch (error) {
                   console.log("Error sending order details: " + error);
                 }
               }
             } catch (error) {
               console.error("Error creating Razorpay order:", error);
               setIsLoading(false);
             }
            console.log("Payment Successful:", response);
          },
          prefill: {
            name: `${user.name}`,
            email: `${user.email}`,
            contact: 9899253639,
          },
          notes: {
            address: address,
          },
          theme: {
            color: "#012652",
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
        setIsLoading(false);

        // yaha kara hai
        
      } catch (error) {
        console.error("Error creating Razorpay order:", error);
        setIsLoading(false);
      }
    }, 2000);
  };
  return (
    <>
      {!products.length ? (
        <Loading />
      ) : (
        <>
          <ProgressBar />
          {!proceed && !isLoading ? (
            <Error />
          ) : (
            <div className="order-confirmation-page">
              <h1>Order Confirmation</h1>
              <div className="order-summary">
                <h2>Order Summary</h2>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((item) => (
                        <tr key={item.product._id}>
                          <td>
                            <div className="product-info">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/uploads/" +
                                  getFileNameFromPath(item.product.pics[0])
                                }
                                alt={`${item.product.name}`}
                              />
                              <p>{truncateName(item.product.name)}</p>
                            </div>
                          </td>
                          <td>{item.count}</td>
                          <td>₹{item.product.price}</td>
                          <td>₹{item.product.price * item.count}</td>
                        </tr>
                      ))}
                      <tr>
                        <td></td>
                        <td></td>
                        <td>Total:</td>
                        <td>₹{calculateTotal(products)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="shipping-address">
                <h2>Shipping Address</h2>
                <div className="address-details">
                  <p className="name">{address.name}</p>
                  <p className="street">{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zip}
                  </p>
                  <p>{address.phone}</p>
                </div>
              </div>

              <div className="promo-code">
                <h2>Apply Promo Code</h2>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                />
                <button onClick={handleApplyPromoCode}>Apply</button>
              </div>

              <div className="buttons">
                <button onClick={handleContinueToPayment}>
                  Proceed to Payment
                </button>
              </div>
              {isLoading && (
                <div className="loading-modal">
                  <div className="loading-spinner"></div>
                  <p>Processing payment...</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default OrderConfirmationPage;
