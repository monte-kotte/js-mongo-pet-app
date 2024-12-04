import React from 'react';
import './AdoptPetModal.css';
import happyDog from '../assets/images/happyDog.png';
import happyCat from '../assets/images/happyCat.png';
import happyRabbit from '../assets/images/happyRabbit.png';

const getPetImage = (type) => {
    switch (type) {
        case 'dog':
            return happyDog;
        case 'cat':
            return happyCat;
        case 'rabbit':
            return happyRabbit;
        default:
            return null;
    }
};

const AdoptPetModal = ({ petName, petType, onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="btn close-btn" onClick={onCancel}>Close</button>
                <h2>Are you sure you want to adopt this sweet angel, {petName} the {petType}?</h2>
                <img src={getPetImage(petType)} alt={`${petType} pet`} className="pet-image" />
                <div className="modal-actions">
                    <button className="btn confirm-adopt-btn" onClick={onConfirm}>
                        Yes, I want!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdoptPetModal;
