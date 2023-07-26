import "./CartModal.css";
import React from "react";
import { Link } from "react-router-dom";
import { UserState } from "../Context/UserProvider";
import { removeItem } from "../functions/functions";

const CartModal = ({ closeModal }) => {
  const { setUser, cart, setCart } = UserState();

  const truncateName = (name) => {
    if (name.length > 15) {
      return name.slice(0, 15) + "...";
    }
    return name;
  };
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.cnt;
    });
    return total.toFixed(2);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2 className="cart-heading">Your Shopping Cart</h2>
        <div className="cart-items">
          {cart.length > 0 ? (
            <ul className="cart-list">
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <div className="item-info">
                    <div className="item-image">
                      <img
                        src={require(`../TopSecHome/img_1/slider10Images/image1.webp`)}
                      />
                    </div>
                    <div className="item-details">
                      {/* <div className="item-name">{truncateName(item.name)}</div> */}
                      <div className="item-name">NA</div>
                      <div className="item-actions">
                        <span className="item-count">x {item.cnt}</span>
                        <div className="item-actions">
                          <Link
                            className="update-button items"
                            to={"/product/:id"}
                            onClick={closeModal}
                          >
                            Update
                          </Link>
                          <button
                            className="delete-button items"
                            onClick={() =>
                              removeItem(item.id, setUser, cart, setCart)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item-price">₹ NA </div>
                  <div className="item-total">
                    {/* ₹{(item.price * item.cnt).toFixed(2)} */}
                    NA
                  </div>
                </li>
              ))}
              <li className="cart-summary">
                <div className="summary-label">Total:</div>
                <div className="summary-total">₹{calculateTotalAmount()}</div>
              </li>
            </ul>
          ) : (
            <p className="empty-cart-message">Your cart is empty.</p>
          )}
        </div>
        <div className="cart-footer">
          {cart.length > 0 && (
            <Link className="checkout-button" to={"/proceed-to-checkout"}>
              Proceed to Checkout
            </Link>
          )}
          <button className="continue-shopping-button" onClick={closeModal}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
