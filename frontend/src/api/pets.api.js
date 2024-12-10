import { API_PETS_URL } from './api.config';

export const fetchAllPets = async () => {
    const response = await fetch(`${API_PETS_URL}`);
    if (!response.ok) {
        throw new Error('Failed to fetch pets');
    }
    return response.json();
};

export const createPet = async (petData) => {
    const response = await fetch(`${API_PETS_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(petData),
    });
    if (!response.ok) {
        throw new Error('Failed to create pet');
    }
    return response.json();
};

export const deletePet = async (petId) => {
    const response = await fetch(`${API_PETS_URL}/${petId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete pet');
    }
};

export const updatePet = async (petId, petData) => {
    const response = await fetch(`${API_PETS_URL}/${petId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(petData),
    });
    if (!response.ok) {
        throw new Error('Failed to update pet');
    }
    return response.json();
};
