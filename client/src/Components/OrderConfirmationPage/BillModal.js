import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BillModal.css";

const BillModal = ({ bill, countDown = true, onClose = {} }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countDown) {
      const countdownInterval = setInterval(() => {
        if (countdown > 1) {
          setCountdown(countdown - 1);
        } else {
          clearInterval(countdownInterval);
          navigate("/order-history");
        }
      }, 1000);

      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [countdown, navigate]);

  const { amount, order_id, id } = bill;

  return (
    <>
      <div className="body-container">
        <div className="container">
          {!countDown && (
            <button className="container-span" onClick={onClose}>
              X
            </button>
          )}
          <div className="printer-top"></div>

          <div className="paper-container">
            <div className="printer-bottom"></div>

            <div className="paper">
              <div className="main-contents">
                <div className="success-icon">&#10004;</div>
                <div className="success-title">Payment Complete</div>
                <div className="success-description">
                  Thank you for your purchase! Your payment has been
                  successfully processed and your order is confirmed. Here are
                  the details of your purchase:
                  <div className="payment-details">
                    <p>
                      <strong>Order Id:</strong> {order_id}
                    </p>
                    <p>
                      <strong>Payment Amount:</strong> {amount / 100} INR
                    </p>
                    <p>
                      <strong>Payment ID:</strong> {id}
                    </p>
                  </div>{" "}
                  <br />
                  We'll process your order and keep you updated on its status.
                </div>
                <div className="order-footer">Thank you!</div>
              </div>
              <div className="jagged-edge"></div>
            </div>
          </div>
          {countDown && (
            <div className="redirecting-message">
              Redirecting to Order History... {countdown} seconds
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BillModal;
