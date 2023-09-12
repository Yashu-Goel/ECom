import React from "react";
import "./ConfirmationModal.css"; // Import your CSS file for the modal styles

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay-logout">
      <div className="modal-content-logout">
        <h2>Logout Confirmation</h2>
        <p>Are you sure you want to log out?</p>
        <div className="modal-buttons-logout">
          <button className="confirm-button-logout" onClick={onConfirm}>
            Confirm
          </button>
          <button className="cancel-button-logout" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
