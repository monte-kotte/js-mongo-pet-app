import React, { useEffect, useState } from 'react';
import './PetPage.css';
import PopupMessage from '../components/PopupMessage.jsx';
import dogImage from '../assets/images/dog.png';
import catImage from '../assets/images/cat.png';
import rabbitImage from '../assets/images/rabbit.png';

const PetPage = () => {
    const [pet, setPet] = useState(null);
    const [formData, setFormData] = useState({ name: '', type: 'dog', age: '' });
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const petId = 1;
    const apiPort = import.meta.env.VITE_API_PORT || 3000; // Default to 3000 if not set

    useEffect(() => {
        fetch(`http://localhost:${apiPort}/api/pet/${petId}`)
            .then((response) => response.json())
            .then((data) => setPet(data))
            .catch((error) => console.error('Error fetching pet:', error));
    }, []);

    const getPetImage = (type) => {
        switch (type) {
            case 'dog':
                return dogImage;
            case 'cat':
                return catImage;
            case 'rabbit':
                return rabbitImage;
            default:
                return null;
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:${apiPort}/api/pet`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to create pet');
                }
                return response.json();
            })
            .then((newPet) => {
                setPopupMessage('Pet created successfully!');
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 1000); // Hide popup after 3 seconds
            })
            .catch((error) => console.error('Error creating pet:', error));
    };

    if (!pet) {
        return <div>Loading...</div>;
    }

    return (
        <div className="pet-page">
            <h1>Pet Information</h1>

            {/* Form to create a new pet */}
            <form className="create-pet-form" onSubmit={handleFormSubmit}>
                {showPopup && <PopupMessage message={popupMessage} />}
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        required
                        min="0"
                    />
                </div>
                <button type="submit">Create Pet</button>
            </form>

            {/* Table showing pet information */}
            <table>
                <thead>
                    <tr>
                        <th>Pet ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{pet.petId}</td>
                        <td>{pet.name}</td>
                        <td className="pet-type">
                            <img src={getPetImage(pet.type)} alt={pet.type} />
                            {pet.type}
                        </td>
                        <td>{pet.age}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PetPage;
