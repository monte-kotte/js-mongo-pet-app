const express = require('express');
const router = express.Router();
const {
    createPet,
    getAllPets,
    getPetById,
    updatePet,
    deletePet,
} = require('../controllers/pets.controller');

router.post('/', createPet);
router.get('/', getAllPets);
router.get('/:id', getPetById);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

module.exports = router;
