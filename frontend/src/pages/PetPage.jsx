import React, { useEffect, useState } from 'react';
import catImage from '../assets/images/cat.png';
import dogImage from '../assets/images/dog.png';
import rabbitImage from '../assets/images/rabbit.png';
import CreatePetForm from '../components/CreatePetForm.jsx';
import AdoptPetModal from '../components/AdoptPetModal.jsx';
import PopupMessage from '../components/PopupMessage.jsx';
import { fetchAllPets, createPet, deletePet } from '../api/pets.api.js';
import './PetPage.css';

const PetPage = () => {
    const [pets, setPets] = useState([]);
    const [formData, setFormData] = useState({ name: '', type: 'dog', age: '' });
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);
    const [petToDelete, setPetToDelete] = useState(null);

    useEffect(() => {
        fetchAllPets()
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
        createPet(formData)
            .then((newPet) => {
                setPopupMessage('Pet created successfully!');
                setPets((prevPets) => [...prevPets, newPet]);
                setFormData({ name: '', type: 'dog', age: '' });
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 1000);
                closeCreateModal();
            })
            .catch((error) => console.error('Error creating pet:', error));
    };

    const handleDeletePet = (petId) => {
        deletePet(petId)
            .then(() => {
                setPopupMessage('Pet adopted successfully!');
                setPets((prevPets) => prevPets.filter((pet) => pet.petId !== petId));
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 1000);
            })
            .catch((error) => console.error('Error deleting pet:', error));
    };

    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const openAdoptModal = (pet) => {
        setPetToDelete(pet);
        setIsAdoptModalOpen(true);
    };

    const closeAdoptModal = () => {
        setPetToDelete(null);
        setIsAdoptModalOpen(false);
    };

    return (
        <div className="pet-page">
            {showPopup && <PopupMessage message={popupMessage} />}
            <h1>Pet Adoption application</h1>
            <button onClick={openCreateModal} className="btn create-pet-btn">Here You can add a new Pet</button>
            <h2>And here, you can meet your next best friend ❤️</h2>
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
                                    className={`btn adopt-pet-btn ${pet.petId === 1 ? 'disabled' : ''}`}
                                    onClick={() => openAdoptModal(pet)}
                                    disabled={pet.petId === 1}
                                >
                                    Adopt this Pet
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

            {isAdoptModalOpen && (
                <AdoptPetModal
                    petName={petToDelete.name}
                    petType={petToDelete.type}
                    onConfirm={() => {
                        handleDeletePet(petToDelete.petId);
                        closeAdoptModal();
                    }}
                    onCancel={closeAdoptModal}
                />
            )}
        </div>
    );
};

export default PetPage;
