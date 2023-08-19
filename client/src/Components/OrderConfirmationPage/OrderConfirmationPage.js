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
import BillModal from "./BillModal";

const OrderConfirmationPage = () => {
  const [promoCode, setPromoCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [address, setAddress] = useState({});
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState();
  const [paymentModal, setPaymentModal] = useState(false);
  const [bill, setBill] = useState({});
  const [response, setResponse] = useState({});
  const { user, cart } = UserState();
  const [userAddress, setUserAddress] = useState({});
  const [userName, setUserName] = useState({});

  useEffect(() => {
    setIsLoading(true);
    const user_address = JSON.parse(localStorage.getItem("address"));
    if (user_address) {
      const addressString = `${user_address.street}, ${user_address.city}, ${user_address.state}, ${user_address.zip}`;
      setUserAddress(addressString)
      setUserName(user_address.name)
    }
    const fetchUserId = async () => {
      try {
        const userEmail = JSON.parse(localStorage.getItem("profile"));
        if (!userEmail.email) {
          toast.error("Email id not found");
          return;
        }
        const response = await axios.post(API_BASE + "/user/userid", {
          email: userEmail.email,
        });

        setUserId(response.data);
        // getting order Status from user id
        try {
          const statusResponse = await axios.get(
            API_BASE + "/seller/OrderStatus",
            {
              params: {
                id: response.data,
              },
            }
          );

          // jo karna hai yaha karo
        } catch (error) {
          console.error("Error fetching order statuses:", error);
        }
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
          amount: calculateTotal(products) * 100,
          currency: "INR",
          name: "PrimeBuy",
          description: "Payment for Order",
          order_id: orderId,
          handler: async function (response) {
            try {
              setIsLoading(true);
              const bill = await axios.post(
                `${API_BASE}/verify-payment/capture/${response.razorpay_payment_id}`,
                {
                  amount: calculateTotal(products) * 100,
                }
              );
              setPaymentModal(true);
              setBill(bill);
              setResponse(response);

              if (
                bill &&
                bill.data &&
                bill.data.resp &&
                bill.data.resp.captured
              ) {
                try {
                  const config = {
                    headers: {
                      Authorization: `Bearer ${user.token}`,
                    },
                  };
                  await axios.post(
                    API_BASE + "/updateAddress/order-history",
                    {
                      products: cart,
                      shippingDetails: address,
                      paymentDetails: bill.data.resp,
                    },
                    config
                  );
                  // toast.success("Order details sent to seller");
                } catch (error) {
                  console.log("Error sending order details: " + error);
                }
              }

              setIsLoading(false);
            } catch (error) {
              console.log(error);
              toast.error("Payment error");
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
                  customer_name: userName,
                  customer_address: userAddress,
                };
                const config = {
                  headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                  },
                };
                try {
                  await axios.post(
                    API_BASE + "/seller/order_details",
                    orderDetails,
                    config
                  );
                  toast.success("Order details sent to seller");
                } catch (error) {
                  console.log("Error sending order details: " + error);
                }
              }
            } catch (error) {
              console.error("Error creating Razorpay order:", error);
              setIsLoading(false);
            }
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
      } catch (error) {
        console.error("Error creating Razorpay order:", error);
        setIsLoading(false);
      }
    }, 2000);
  };
  const closeModal = () => {
    setPaymentModal(false);
  };
  return (
    <>
      {paymentModal && bill && response && (
        <BillModal onClose={closeModal} bill={bill.data.resp} response={response} />
      )}
      {!products.length ? (
        <Loading />
      ) : (
        <>
          <ProgressBar paymentModal={paymentModal} />
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
