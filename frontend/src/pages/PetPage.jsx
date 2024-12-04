import React, { useEffect, useState } from 'react';
import catImage from '../assets/images/cat.png';
import dogImage from '../assets/images/dog.png';
import rabbitImage from '../assets/images/rabbit.png';
import CreatePetForm from '../components/CreatePetForm.jsx';
import DeletePetModal from '../components/DeletePetModal.jsx';
import PopupMessage from '../components/PopupMessage.jsx';
import './PetPage.css';

const PetPage = () => {
    const [pets, setPets] = useState([]);
    const [formData, setFormData] = useState({ name: '', type: 'dog', age: '' });
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [petToDelete, setPetToDelete] = useState(null);
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
                setPets((prevPets) => [...prevPets, newPet]);
                setFormData({ name: '', type: 'dog', age: '' });
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 1000);
            })
            .catch((error) => console.error('Error creating pet:', error));
        closeCreateModal();

    };

    const handleDeletePet = (petId) => {
        fetch(`http://localhost:${apiPort}/api/pet/${petId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete pet');
                }
                setPets((prevPets) => prevPets.filter((pet) => pet.petId !== petId));
            })
            .catch((error) => console.error('Error deleting pet:', error));
    };

    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const openDeleteModal = (pet) => {
        setPetToDelete(pet);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setPetToDelete(null);
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="pet-page">
            {showPopup && <PopupMessage message={popupMessage} />}
            <h1>Pet Management application</h1>
            <button onClick={openCreateModal} className="btn create-pet-btn">Here You can create a new Pet</button>

            <table>
                <thead>
                    <tr>
                        <th>Pet ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th className="pet-age">Age</th>
                        <th>Actions</th>
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
                            <td>
                                <button
                                    className={`btn delete-pet-btn ${pet.petId === 1 ? 'disabled' : ''}`}
                                    onClick={() => openDeleteModal(pet)}
                                    disabled={pet.petId === 1}
                                >
                                    Delete Pet
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isCreateModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="btn close-btn" onClick={closeCreateModal}>Close</button>
                        <CreatePetForm
                            formData={formData}
                            onInputChange={handleInputChange}
                            onSubmit={handleFormSubmit}
                        />
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <DeletePetModal
                    petName={petToDelete.name}
                    onConfirm={() => {
                        handleDeletePet(petToDelete.petId);
                        closeDeleteModal();
                    }}
                    onCancel={closeDeleteModal}
                />
            )}

        </div>
    );
};

export default PetPage;
