import React, { useEffect, useState } from 'react';
import './PetPage.css';

// Import all images at the top
import dogImage from '../assets/images/dog.png';
import catImage from '../assets/images/cat.png';
import rabbitImage from '../assets/images/rabbit.png';


const PetPage = () => {
    const [pet, setPet] = useState(null);
    const petId = 1;
    const apiPort = import.meta.env.VITE_API_PORT || 3000; // Default to 3000 if not set

    useEffect(() => {
        // Correct URL to fetch data from your local API running on port 3000
        fetch(`http://localhost:${apiPort}/api/pet/${petId}`)
            .then((response) => response.json())
            .then((data) => setPet(data))
            .catch((error) => console.error('Error fetching pet:', error));
    }, []);

    if (!pet) {
        return <div>Loading...</div>;
    }

    // Function to determine the image URL based on the pet type
    const getPetImage = (type) => {
        switch (type.toLowerCase()) {
            case 'dog':
                return dogImage; // Returning the imported dog image
            case 'cat':
                return catImage; // Returning the imported cat image
            case 'rabbit':
                return rabbitImage; // Returning the imported rabbit image
            default:
                return;
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
                            <img src={pet.type === 'dog' ? dogImage : pet.type === 'cat' ? catImage : rabbitImage} alt={pet.type} />
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
