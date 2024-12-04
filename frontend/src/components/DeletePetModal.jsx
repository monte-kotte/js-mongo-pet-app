import React from 'react';
import './DeletePetModal.css';

const DeletePetModal = ({ petName, onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="btn close-btn" onClick={onCancel}>Close</button>
                <h2>Are you sure you want to remove {petName} pet?</h2>
                <div className="modal-actions">
                    <button className="btn confirm-delete-btn" onClick={onConfirm}>
                        Yes, delete
                    </button>
                    <button className="btn cancel-delete-btn" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePetModal;
