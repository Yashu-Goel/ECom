import React, { useState, useEffect } from "react";
import "./ProductModal.css";
import { UserState } from "../Context/UserProvider";
import { API_BASE } from "../functions/functions";
import axios from "axios";
import { getFileNameFromPath } from "../IndividualProduct/function";
import {
  calculateTotal,
  truncateName,
} from "../OrderConfirmationPage/function";

const ProductModal = ({ cart, onClose }) => {
  const { user } = UserState();
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
      if (user) {
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
        }
      }
    };
    getProductDetails();
    setIsLoading(false);
  }, [cart, user]);

  return (
    <>
      <div className="modal1">
        <div className="modal-content1">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <div className="cart-items">
            {isLoading ? (
              <div>Loading items...</div>
            ) : products.length > 0 ? (
              <ul className="cart-list">
                {products.map((item, index) => (
                  <li key={index} className="cart-item1">
                    <div className="item-info">
                      <div className="item-image">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/uploads/" +
                            getFileNameFromPath(item.product.pics[0])
                          }
                          alt={`${item.product.name}`}
                        />
                      </div>
                      <div className="item-details">
                        <div className="item-name">
                          {truncateName(item.product.name)}
                        </div>
                        <div className="item-actions">
                          <span className="item-count">x {item.count}</span>
                          <div className="item-actions"></div>
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
              <p className="empty-cart-message">Oops some thing went wrong</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
