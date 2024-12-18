
const { RequestEmptyFieldError, RequestValidationError } = require('../errors/custom-errors.js');

const validatePetFields = (name, type, age) => {
    if (!name || !type || !age) {
        throw new RequestEmptyFieldError('All fields (name, type, age) are required.');
    }

    if (!['cat', 'dog', 'rabbit'].includes(type)) {
        throw new RequestValidationError(`Invalid pet type: '${type}'.`);
    }

    if (isNaN(age)) {
        throw new RequestValidationError('Age must be a number.');
    }
};

module.exports = validatePetFields;
