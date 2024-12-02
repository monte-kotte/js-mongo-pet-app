import React from 'react';
import './PopupMessage.css';

const PopupMessage = ({ message }) => {
    return (
        <div className="popup-message">
            {message}
        </div>
    );
};

export default PopupMessage;
