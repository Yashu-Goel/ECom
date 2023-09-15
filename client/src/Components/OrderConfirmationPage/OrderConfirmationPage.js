import React, { useState, useEffect } from "react";
import { UserState } from "../Context/UserProvider";
import axios from "axios";
import { API_BASE, removeItem } from "../functions/functions";
import "./OrderConfirmationPage.css";
import { truncateName, calculateTotal } from "./function";
import Error from "./Error";
import Loading from "../Loaders/Loading";
import BillModal from "./BillModal";
import { AWS_LINK } from "../IndividualProduct/function";
import PaymentLoader from "../Loaders/PaymentLoader";

const OrderConfirmationPage = () => {
  const [promoCode, setPromoCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [paymentLoader, setpaymentLoader] = useState("");
  const [address, setAddress] = useState(null);
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [paymentModal, setPaymentModal] = useState(false);
  const [bill, setBill] = useState({});
  const { user, cart, setCart } = UserState();

  useEffect(() => {
    const fetchUserId = async () => {
      const profile = JSON.parse(localStorage.getItem("profile"));
      const getAddress = JSON.parse(localStorage.getItem("address"));
      try {
        if (!profile || !getAddress || cart?.length <= 0) {
          setIsLoading(false);
          return;
        }
        const response = await axios.get(API_BASE + "/user/userid", {
          headers: {
            Authorization: `Bearer ${profile.token}`,
          },
        });
        setAddress(getAddress);
        setUserId(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchUserId();

    const getProductDetails = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
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
      } finally {
        setIsLoading(false);
      }
    };
    getProductDetails();
  }, [cart, user]);

  const handleApplyPromoCode = () => {};

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
    setpaymentLoader("Please wait while payment is loading");
    setTimeout(async () => {
      try {
        await loadRazorpay();
        const config = {
          headers: {
            Authorization: `Bearer ${userId.token}`,
          },
        };
        const response = await axios.post(
          API_BASE + "/create-razorpay-order",
          {
            amount: calculateTotal(products),
          },
          config
        );
        const orderId = response?.data.id;

        const options = {
          key: "rzp_test_LSiKQ94s76cQTy",
          amount: calculateTotal(products) * 100,
          currency: "INR",
          name: "PrimeBuy",
          description: "Payment for Order",
          order_id: orderId,
          handler: async function (response) {
            const bill = await axios.post(
              `${API_BASE}/verify-payment/capture/${response.razorpay_payment_id}`,
              {
                amount: calculateTotal(products) * 100,
              }
            );
            setpaymentLoader("Verifying payment!");
            if (bill?.data?.resp?.captured) {
              setTimeout(() => {
                setBill(bill);
                setPaymentModal(true);
                setpaymentLoader("");
              }, 1500);
            }
            if (bill?.data?.resp) {
              for (const product of products) {
                const orderDetails = {
                  sellerId: product.product.sellerId,
                  productId: product.product._id,
                  customerId: userId._id,
                  amount: product.product.price,
                  count: product.count,
                  customer_address: address,
                  paymentDetails: bill.data.resp,
                };
                const config = {
                  headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                  },
                };
                await axios.post(
                  API_BASE + "/seller/order_details",
                  orderDetails,
                  config
                );
              }
              removeItem(undefined, user, cart, setCart, true);
            }
          },
          prefill: {
            name: `${userId.name}`,
            email: `${userId.email}`,
            contact: "",
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
      } catch (error) {
        console.error("Error creating Razorpay order:", error);
      } finally {
        setpaymentLoader("");
      }
    }, 2000);
  };
  const closeModal = () => {
    setPaymentModal(false);
  };
  return (
    <>
      {paymentModal && bill && (
        <BillModal onClose={closeModal} bill={bill?.data.resp} />
      )}
      {paymentLoader && <PaymentLoader text={paymentLoader} />}

      {isLoading ? (
        <Loading />
      ) : !address || !userId ? (
        <Error />
      ) : (
        <div className="order-confirmation-page">
          <h2>Order Confirmation</h2>
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
                  {products?.map((item) => (
                    <tr key={item.product._id}>
                      <td>
                        <div className="confirm-order-product-info">
                          <img
                            src={`${AWS_LINK}/${item.product.imageName[0]}`}
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
              <p className="name">{address?.name}</p>
              <p className="street">{address?.street}</p>
              <p>
                {address?.city}, {address?.state} {address?.zip}
              </p>
              <p>{address?.phone}</p>
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
  );
};

export default OrderConfirmationPage;
