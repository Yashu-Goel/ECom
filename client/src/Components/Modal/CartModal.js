import "./CartModal.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserState } from "../Context/UserProvider";
import { removeItem } from "../functions/functions";
import { API_BASE } from "../functions/functions";
import { AWS_LINK } from "../IndividualProduct/function";
import {
  calculateTotal,
  truncateName,
} from "../OrderConfirmationPage/function";

const CartModal = ({ closeModal }) => {
  const { cart, setCart, user } = UserState();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
      } catch (error) {}
    };

    getProductDetails();
    setIsLoading(false);
  }, [cart, user.token]);
  console.log(products);
  return (
    <>
      {isLoading && (
        <div className="loading-modal">
          <p className="loading-spinner"></p>
          <p>Loading Cart</p>
          <br />
        </div>
      )}
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h2 className="cart-heading">Your Shopping Cart</h2>
          <div className="cart-items">
            {isLoading ? (
              <div>Loading items...</div>
            ) : products.length > 0 ? (
              <ul className="cart-list">
                {products.map((item, index) => (
                  <li key={index} className="cart-item">
                    <div className="item-info">
                      <div className="item-image">
                        <img
                          src={`${AWS_LINK}/${item.product.imageName[0]}`}
                          alt={`${item.product.name}`}
                        />
                      </div>
                      <div className="item-details">
                        <div className="item-name">
                          {truncateName(item.product.name)}
                        </div>
                        <div className="item-actions">
                          <span className="item-count">x {item.count}</span>
                          <div className="item-actions">
                            <Link
                              className="update-button items"
                              to={`/product/${item.product._id}`}
                              onClick={closeModal}
                            >
                              Update
                            </Link>
                            <button
                              className="delete-button items"
                              onClick={() => {
                                removeItem(
                                  item.product._id,
                                  user,
                                  cart,
                                  setCart
                                );
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item-price">₹ {item.product.price}</div>
                    <div className="item-total">
                      ₹{(item.product.price * item.count).toFixed(2)}
                    </div>
                  </li>
                ))}
                <li className="cart-summary">
                  <div className="summary-label">Total:</div>
                  <div className="summary-total">
                    ₹{calculateTotal(products)}
                  </div>
                </li>
              </ul>
            ) : (
              <p className="empty-cart-message">Your cart is empty.</p>
            )}
          </div>
          <div className="cart-footer">
            {isLoading ? (
              // Render loading indicator while data is being fetched
              <div>Loading...</div>
            ) : (
              cart.length > 0 && (
                <Link className="checkout-button" to={"/shipping-address"}>
                  Proceed to Checkout
                </Link>
              )
            )}
            <button className="continue-shopping-button" onClick={closeModal}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal;
