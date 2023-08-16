import React from "react";
import "./BillModal.css";

const BillModal = ({ bill, response }) => {
  console.log(bill, response);

  const { amount, method, email } = bill.data.resp;
  const { razorpay_order_id, razorpay_payment_id } = response;

  return (
    <div className="body-container">
      <div className="container">
        <div className="printer-top"></div>

        <div className="paper-container">
          <div className="printer-bottom"></div>

          <div className="paper">
            <div className="main-contents">
              <div className="success-icon">&#10004;</div>
              <div className="success-title">Payment Complete</div>
              <div className="success-description">
                Thank you for your purchase! Your payment has been successfully
                processed and your order is confirmed. Here are the details of
                your purchase:
                <div className="payment-details">
                  <p>
                    <strong>Order Id:</strong> {razorpay_order_id}
                  </p>
                  <p>
                    <strong>Payment Amount:</strong> {amount / 100} INR
                  </p>
                  <p>
                    <strong>Payment ID:</strong> {razorpay_payment_id}
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
      </div>
    </div>
  );
};

export default BillModal;
