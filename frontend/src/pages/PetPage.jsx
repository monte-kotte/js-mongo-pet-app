import React, { useEffect, useState } from 'react';
import './PetPage.css';
import PopupMessage from '../components/PopupMessage.jsx';
import PetForm from '../components/CreatePetForm.jsx';
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
                setFormData({ name: '', type: 'dog', age: '' });
                setTimeout(() => setShowPopup(false), 1000);
            })
            .catch((error) => console.error('Error creating pet:', error));
    };

    return (
        <div className="pet-page">
            <h1>Create a new Pet</h1>

            {showPopup && <PopupMessage message={popupMessage} />}
            <PetForm
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleFormSubmit}
            />

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
