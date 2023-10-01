import "./CartModal.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserState } from "../Context/UserProvider";
import { removeItem } from "../functions/functions";
import { API_BASE } from "../functions/functions";
import { AWS_LINK } from "../IndividualProduct/function";
import Skeleton from "react-loading-skeleton";
import {
  calculateTotal,
  truncateName,
  toIndianCurrency,
} from "../OrderConfirmationPage/function";
import { toast } from "react-toastify";
import Loader2 from "../Loaders/Loader2";

const CartModal = ({ closeModal }) => {
  const { cart, setCart, user } = UserState();
  const [products, setProducts] = useState([]);
  const [imageLoaded, setImageLoaded] = useState([]);
  const [isloading, setisLoading] = useState(true);
  useEffect(() => {
    setisLoading(true);
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
        toast.error("Oops! Something went wrong.");
      } finally {
        setisLoading(false);
      }
    };

    getProductDetails();
  }, [cart, user.token]);

  const handleImageLoad = (index) => {
    const updatedImageLoaded = [...imageLoaded];
    updatedImageLoaded[index] = true;
    setImageLoaded(updatedImageLoaded);
  };
  const styles = { marginRight: "10px" };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2 className="cart-heading-user">Your Shopping Cart</h2>
        <div className="cart-items">
          {isloading && <Loader2 content="Loading cart.." />}
          {!isloading && products?.length ? (
            <ul className="cart-list">
              {products.map((item, index) => (
                <li key={index} className="cart-item">
                  <div className="item-info">
                    <div className="item-image">
                      <img
                        style={
                          imageLoaded[index]
                            ? { display: "block" }
                            : { display: "none" }
                        }
                        src={`${AWS_LINK}/${item.product.imageName[0]}`}
                        alt={`${item.product.name}`}
                        onLoad={() => {
                          handleImageLoad(index);
                        }}
                      />
                      {!imageLoaded[index] && (
                        <Skeleton
                          width={60}
                          height={60}
                          className="image-skeleton"
                        />
                      )}
                    </div>

                    <div className="item-details">
                      <div className="item-name">
                        {item.product.name ? (
                          truncateName(item.product.name)
                        ) : (
                          <Skeleton width={150} height={20} />
                        )}
                      </div>

                      <span className="item-count">
                        {item.count ? (
                          `x ${item.count}`
                        ) : (
                          <Skeleton width={30} height={20} />
                        )}
                      </span>
                      <div className="item-actions">
                        {item ? (
                          <>
                            <Link
                              className="cart-update-button items"
                              to={`/product/${item.product._id}`}
                              onClick={closeModal}
                            >
                              Update
                            </Link>
                            <button
                              className="cart-delete-button items"
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
                          </>
                        ) : (
                          <>
                            <Skeleton
                              width={80}
                              height={30}
                              style={{ marginRight: "10px", marginTop: "0px" }}
                            />{" "}
                            <Skeleton width={80} height={30} />{" "}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="item-price">
                    {item.product.price ? (
                      toIndianCurrency(item.product.price)
                    ) : (
                      <Skeleton width={80} height={20} />
                    )}
                  </div>

                  <div className="item-total">
                    {item.product.price ? (
                      toIndianCurrency(item.product.price * item.count)
                    ) : (
                      <Skeleton width={100} height={20} />
                    )}
                  </div>
                </li>
              ))}
              <li className="cart-summary">
                <div className="summary-label">Total :</div>
                <div className="summary-total">
                  {products ? (
                    toIndianCurrency(calculateTotal(products))
                  ) : (
                    <Skeleton width={100} height={20} />
                  )}
                </div>
              </li>
            </ul>
          ) : (
            !isloading && (
              <p className="empty-cart-message">Your cart is empty.</p>
            )
          )}
        </div>
        <div className="cart-footer">
          {cart && cart.length > 0 && (
            <Link className="checkout-button" to={"/checkout"}>
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
