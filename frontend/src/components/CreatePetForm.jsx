import React from 'react';
import './CreatePetForm.css';

const CreatePetForm = ({ formData, onInputChange, onSubmit }) => {
    return (
        <form className="create-pet-form" onSubmit={onSubmit}>
            <h1>Create a new Pet</h1>
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
            <button type="submit">Create</button>
        </form>
    );
};

export default CreatePetForm;
