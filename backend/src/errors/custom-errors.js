class RequestEmptyFieldError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RequestEmptyFieldError';
        this.statusCode = 400;
    }
}

class PetNotFoundError extends Error {
    constructor() {
        super('Pet not found.');
        this.name = 'PetNotFoundError';
        this.statusCode = 404;
    }
}

class RequestValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RequestValidationError';
        this.statusCode = 422;
    }
}

module.exports = {
    RequestValidationError,
    PetNotFoundError,
    RequestEmptyFieldError
};
