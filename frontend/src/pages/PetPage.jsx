import React, { useEffect, useState } from 'react';
import { createPet, deletePet, fetchAllPets, updatePet } from '../api/pets.api.js';
import catIcon from '../assets/icons/cat.png';
import dogIcon from '../assets/icons/dog.png';
import ediIcon from '../assets/icons/pencil.png';
import rabbitIcon from '../assets/icons/rabbit.png';
import AdoptPetModal from '../components/AdoptPetModal.jsx';
import CreatePetForm from '../components/CreatePetForm.jsx';
import EditPetForm from '../components/EditPetForm.jsx';
import PopupMessage from '../components/PopupMessage.jsx';
import './PetPage.css';

const PetPage = () => {
    const [pets, setPets] = useState([]);
    const [formData, setFormData] = useState({ name: '', type: 'dog', age: '' });
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);
    const [petToDelete, setPetToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [petToEdit, setPetToEdit] = useState(null);

    useEffect(() => {
        fetchAllPets()
            .then((data) => setPets(data))
            .catch((error) => console.error('Error fetching pets:', error));
    }, []);

    const getPetImage = (type) => {
        switch (type) {
            case 'dog':
                return dogIcon;
            case 'cat':
                return catIcon;
            case 'rabbit':
                return rabbitIcon;
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

    const openEditModal = (pet) => {
        setPetToEdit({ ...pet });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setPetToEdit(null);
        setIsEditModalOpen(false);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setPetToEdit((prevPet) => ({
            ...prevPet,
            [name]: value,
        }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updatePet(petToEdit.petId, petToEdit)
            .then((updatedPet) => {
                setPopupMessage('Pet updated successfully!');
                setPets((prevPets) =>
                    prevPets.map((pet) =>
                        pet.petId === updatedPet.petId ? updatedPet : pet
                    )
                );
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 1000);
                closeEditModal();
            })
            .catch((error) => console.error('Error updating pet:', error));
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
                            <td>
                                <div className="pet-type">
                                    <img src={getPetImage(pet.type)} alt={pet.type} />
                                    {pet.type}
                                </div>
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
                                <button
                                    className="btn edit-pet-btn"
                                    onClick={() => openEditModal(pet)}
                                    disabled={pet.petId === 1}
                                >
                                    <img className="edit-icon" src={ediIcon} alt="Edit" />
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
                            onCancel={closeCreateModal}
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

            {isEditModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="btn close-btn" onClick={closeEditModal}>Close</button>
                        <EditPetForm
                            formData={petToEdit}
                            onInputChange={handleEditInputChange}
                            onSubmit={handleEditSubmit}
                            onCancel={closeEditModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetPage;
