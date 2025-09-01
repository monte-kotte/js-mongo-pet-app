const { faker } = require('@faker-js/faker');

const generateTestPet = () => {
    return {
        name: faker.word.noun(),
        type: faker.helpers.arrayElement(['cat', 'dog', 'rabbit']),
        age: parseFloat(faker.number.float({ min: 1, max: 10, precision: 0.1, fractionDigits: 1 }))
    };
};

module.exports = { generateTestPet };
