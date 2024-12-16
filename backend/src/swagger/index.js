const petsPaths = require('./paths');
const config = require('../config/config.js');
const petRequestSchema = require('./schemas/pet.request.js');
const petResponseSchema = require('./schemas/pet.response.js');

module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'Pet Adoption API',
        version: '1.0.0',
        description: 'API for managing pet adoption',
    },
    servers: [
        {
            url: `http://localhost:${config.port}`,
        },
    ],
    components: {
        schemas: {
            PetRequest: petRequestSchema,
            PetResponse: petResponseSchema,
        },
    },
    paths: {
        ...petsPaths,
    },

};
