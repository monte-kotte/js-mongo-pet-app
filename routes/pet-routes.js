const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');  // Assuming Pet model is defined in 'models/Pet.js'

// Create a new Pet (POST)
router.post('/pet', async (req, res) => {
    try {
        const { name, type, age } = req.body;  // Get data from request body

        // Validate input data
        if (!name || !type || !age) {
            return res.status(400).json({ message: 'All fields (name, type, age) are required.' });
        }

        const petCount = await Pet.countDocuments();  // Get the count of documents in the collection
        const petId = petCount + 1;  // Increment ID based on the current number of pets

        // Create a new Pet document
        const pet = new Pet({
            id: petId,  // Use custom id instead of MongoDB _id
            name,
            type,
            age,
        });

        // Save the new pet to the database
        const savedPet = await pet.save();
        res.status(201).json(savedPet);  // Respond with the saved pet document
    } catch (err) {
        console.error('Error adding pet:', err);
        res.status(500).json({ message: 'Failed to add pet' });
    }
});

// Get all Pets (GET)
router.get('/pets', async (req, res) => {
    try {
        const pets = await Pet.find();  // Retrieve all pets from the database
        res.status(200).json(pets);
    } catch (err) {
        console.error('Error fetching pets:', err);
        res.status(500).json({ message: 'Failed to fetch pets' });
    }
});

// Get Pet by ID (GET)
router.get('/pet/:id', async (req, res) => {
    try {
        const petId = req.params.id;  // Get the pet ID from the URL parameters

        // Find the pet by ID in the database
        const pet = await Pet.findById(petId);

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        // If pet is found, send the pet data as the response
        res.status(200).json(pet);
    } catch (err) {
        console.error('Error retrieving pet:', err);
        res.status(500).json({ message: 'Failed to get pet' });
    }
});

// Update a Pet (PUT)
router.put('/pet/:id', async (req, res) => {
    try {
        const { name, type, age } = req.body;  // Get updated data from request body

        // Validate input data
        if (!name || !type || !age) {
            return res.status(400).json({ message: 'All fields (name, type, age) are required.' });
        }

        // Find the pet by ID and update it
        const updatedPet = await Pet.findByIdAndUpdate(
            req.params.id,
            { name, type, age },
            { new: true }  // Return the updated document
        );

        if (!updatedPet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        res.status(200).json(updatedPet);
    } catch (err) {
        console.error('Error updating pet:', err);
        res.status(500).json({ message: 'Failed to update pet' });
    }
});

// Delete a Pet (DELETE)
router.delete('/pet/:id', async (req, res) => {
    try {
        const deletedPet = await Pet.findByIdAndDelete(req.params.id);  // Find and delete pet by ID

        if (!deletedPet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (err) {
        console.error('Error deleting pet:', err);
        res.status(500).json({ message: 'Failed to delete pet' });
    }
});

module.exports = router;
