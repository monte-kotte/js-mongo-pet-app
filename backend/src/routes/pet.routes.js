const express = require('express');
const router = express.Router();
const {
    createPet,
    getAllPets,
    getPetById,
    updatePet,
    deletePet,
} = require('../controllers/pet.controller');

router.post('/pet', createPet);
router.get('/pets', getAllPets);
router.get('/pet/:id', getPetById);
router.put('/pet/:id', updatePet);
router.delete('/pet/:id', deletePet);

module.exports = router;
