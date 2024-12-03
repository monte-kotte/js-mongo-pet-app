import React, { useEffect, useState } from 'react';
import './PetPage.css';
import PopupMessage from '../components/PopupMessage.jsx';
import dogImage from '../assets/images/dog.png';
import catImage from '../assets/images/cat.png';
import rabbitImage from '../assets/images/rabbit.png';

const PetPage = () => {
    const [pets, setPets] = useState([]);
    const [formData, setFormData] = useState({ name: '', type: 'dog', age: '' });
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const apiPort = import.meta.env.VITE_API_PORT || 3000;

    useEffect(() => {
        fetch(`http://localhost:${apiPort}/api/pets`)
            .then((response) => response.json())
            .then((data) => setPets(data))
            .catch((error) => console.error('Error fetching pets:', error));
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
                setPets((prevPets) => [...prevPets, newPet]);
                setTimeout(() => setShowPopup(false), 1000);
            })
            .catch((error) => console.error('Error creating pet:', error));
    };

    return (
        <div className="pet-page">
            <h1>Pet Information</h1>

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
                    {pets.map((pet) => (
                        <tr key={pet.petId}>
                            <td>{pet.petId}</td>
                            <td>{pet.name}</td>
                            <td className="pet-type">
                                <img src={getPetImage(pet.type)} alt={pet.type} />
                                {pet.type}
                            </td>
                            <td>{pet.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PetPage;
