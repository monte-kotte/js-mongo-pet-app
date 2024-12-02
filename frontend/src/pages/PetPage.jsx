import React, { useEffect, useState } from 'react';
import './PetPage.css';

import dogImage from '../assets/images/dog.png';
import catImage from '../assets/images/cat.png';
import rabbitImage from '../assets/images/rabbit.png';

const PetPage = () => {
    const [pet, setPet] = useState(null);
    const petId = 1;
    const apiPort = import.meta.env.VITE_API_PORT || 3000;

    useEffect(() => {
        fetch(`http://localhost:${apiPort}/api/pet/${petId}`)
            .then((response) => response.json())
            .then((data) => setPet(data))
            .catch((error) => console.error('Error fetching pet:', error));
    }, []);

    if (!pet) {
        return <div>Loading...</div>;
    }

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

    return (
        <div className="pet-page">
            <h1>Pet Information</h1>
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
