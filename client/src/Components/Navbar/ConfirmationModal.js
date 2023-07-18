import React from 'react';
import './ConfirmationModal.css'; // Import your CSS file for the modal styles

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-logout">
        <h2>Logout Confirmation</h2>
        <p>Are you sure you want to log out?</p>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={onConfirm}>Confirm</button>
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
