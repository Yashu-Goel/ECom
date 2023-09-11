import React, { useEffect, useState } from "react";
import "./QuantityModal.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_BASE = "http://192.168.0.103:5000";

const QuantityModal = ({ quantity, id, onClose }) => {
  const [newQuantity, setNewQuantity] = useState();

  const handleQuantity = () => {
    if (isNaN(newQuantity) || newQuantity === "") {
      toast.info("Please enter a valid quantity.");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = axios.put(
        API_BASE + "/seller/update_quantity",
        {
          id,
          count: newQuantity,
        },
        config
      );
      toast.success("Quantity Updated Successfully");
          setTimeout(() => {
            window.location.reload();
          }, 2500);
    
    } catch (error) {
      toast.error("Quantity not updated");

      console.log(error);
    }
  };
  return (
    <>
      <div className="QuantityModalDimBg"></div>
      <div
        className={`QuantityModalOuter ${id ? "QuantityModalOpen" : ""}`}
      >
        <h2>Quantity</h2>
        <div className="QuantityModalInner">
          <div className="QuantityModalDataItems">
            <p>Current Quantity:</p> <span>{quantity}</span>
          </div>
          <div className="QuantityModalDataItems">
            <p>
              <label htmlFor="new-quantity">Enter New Quantity:</label>
            </p>
            <span>
              <input
                type="String"
                id="new-quantity"
                minLength="1"
                onChange={(e) => {
                  setNewQuantity(e.target.value);
                }}
              />
            </span>
          </div>
        </div>
        <div className="QuantityModalButton">
          <button onClick={handleQuantity}>Edit Quantity</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
};

export default QuantityModal;
