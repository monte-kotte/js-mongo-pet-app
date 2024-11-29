const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Pet = require('../models/Pet');

// Create a new Pet (POST)
router.post('/pet', async (req, res, next) => {
    try {
        const { name, type, age } = req.body;

        if (!name || !type || !age) {
            return res.status(400).json({ message: 'All fields (name, type, age) are required.' });
        }

        const petCount = await Pet.countDocuments();
        const petId = petCount + 1;

        const pet = new Pet({
            id: petId,
            name,
            type,
            age,
        });

        const savedPet = await pet.save();
        res.status(201).json(savedPet);
    } catch (err) {
        next(err);
    }
});

// Get all Pets (GET)
router.get('/pets', async (req, res, next) => {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets);
    } catch (err) {
        next(err);
    }
});

// Get Pet by ID or petId (GET)
router.get('/pet/:id', async (req, res, next) => {
    try {
        const petId = req.params.id;

        const pet = mongoose.Types.ObjectId.isValid(petId)
            ? await Pet.findById(petId)
            : await Pet.findOne({ petId: petId });

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        res.status(200).json(pet);
    } catch (err) {
        next(err);
    }
});

// Update a Pet (PUT)
router.put('/pet/:id', async (req, res, next) => {
    try {
        const { name, type, age } = req.body;
        const petId = req.params.id;

        if (!name || !type || !age) {
            return res.status(400).json({ message: 'All fields (name, type, age) are required.' });
        }

        const pet = await Pet.findOneAndUpdate(
            mongoose.Types.ObjectId.isValid(petId) ? { _id: petId } : { petId: petId },
            { name, type, age },
            { new: true }
        );

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        res.status(200).json(pet);
    } catch (err) {
        next(err);
    }
});

// Delete a Pet (DELETE)
router.delete('/pet/:id', async (req, res, next) => {
    try {
        const petId = req.params.id;

        const pet = await Pet.findOneAndDelete(
            mongoose.Types.ObjectId.isValid(petId) ? { _id: petId } : { petId: petId }
        );

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
