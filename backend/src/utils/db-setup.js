const Pet = require('../models/pet.model.js');

const DEFAULT_PET = {
    name: 'Admin little angel',
    type: 'rabbit',
    age: 3,
};

async function ensureDefaultDog() {
    try {
        const existingPet = await Pet.findOne({ petId: 1 });
        if (!existingPet) {
            await Pet.create(DEFAULT_PET);
            console.log('Default pet added to the database with petId 1');
        }
    } catch (error) {
        console.error('Error adding the default pet:', error);
    }
}

module.exports = { ensureDefaultDog };
