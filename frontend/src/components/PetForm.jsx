import React from 'react';
import './PetForm.css';

const PetForm = ({ formData, onInputChange, onSubmit, onCancel, className, isEdit }) => {
    return (
        <form className={`pet-form ${className}`} onSubmit={onSubmit}>
            <h1>{isEdit ? 'Edit Pet Details' : 'Create a new Pet'}</h1>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={onInputChange}
                    required
                    placeholder="Enter pet's name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="type">Type:</label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={onInputChange}
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
                    step="0.1"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={onInputChange}
                    min="0"
                    required
                    placeholder="Enter pet's age (e.g., 2 or 2.5)"
                />
            </div>
            <div className="form-actions">
                <button type="button" className="btn cancel-btn" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="btn">
                    {isEdit ? 'Save Changes' : 'Create'}
                </button>
            </div>
        </form>
    );
};

export default PetForm;
