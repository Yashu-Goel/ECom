import "./CartModal.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CartModal = ({
  cartItems,
  closeModal,
  proceedToCheckout,
  deleteItem,
}) => {
  const truncateName = (name) => {
    if (name.length > 15) {
      return name.slice(0, 15) + "...";
    }
    return name;
  };
  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
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
          {cartItems.length > 0 ? (
            <ul className="cart-list">
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <div className="item-info">
                    <div className="item-image">
                      <img
                        src={require(`../TopSecHome/img_1/slider10Images/${item.pic}`)}
                      />
                    </div>
                    <div className="item-details">
                      <div className="item-name">{truncateName(item.name)}</div>
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
                            onClick={() => deleteItem(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item-price">₹{item.price}</div>
                  <div className="item-total">
                    ₹{(item.price * item.cnt).toFixed(2)}
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
          {cartItems.length > 0 && (
            <button className="checkout-button" onClick={proceedToCheckout}>
              Proceed to Checkout
            </button>
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
