import React from "react";
import "./Customer.css";

const Customer = ({ customer_address, onClose }) => {
  const { name, street, city, state, zip, phone } = customer_address;

  return (
    <>
      <div className="CustomerModalBackground"></div>
      <div className="customer-modal">
        <div className="modal-content">
          <h2>Customer Details</h2>
          <p>
            <span>Customer Name:</span> {name}
          </p>
          <p>
            <span>Customer Address: </span>
          </p>
          <div className="CustomerDetails">
            <p>
              <span>Street:</span> {street}
            </p>
            <p>
              <span>City:</span> {city}
            </p>
            <p>
              <span>State:</span> {state}
            </p>
            <p>
              <span>ZIP Code:</span> {zip}
            </p>
            <p>
              <span>Phone:</span> {phone}
            </p>
          </div>
          <button className="CustomerModalButton" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Customer;
