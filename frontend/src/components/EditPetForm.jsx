import React from 'react';
import './PetForm.css';

const EditPetForm = ({ formData, onInputChange, onSubmit, onCancel }) => {
    return (
        <form className="pet-form edit-pet-form" onSubmit={onSubmit}>
            <h1>Edit Pet Details</h1>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={onInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="type">Type:</label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={onInputChange}
                    required
                >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="rabbit">Rabbit</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={onInputChange}
                    required
                />
            </div>
            <div className="form-actions">
                <button type="button" className="btn cancel-btn" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="btn save-btn">Save Changes</button>
            </div>
        </form>
    );
};

export default EditPetForm;
