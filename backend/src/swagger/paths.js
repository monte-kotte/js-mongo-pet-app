const PetRequest = require('./schemas/pet.request.js');
const PetResponse = require('./schemas/pet.response.js');

module.exports = {
    '/api/pets': {
        post: {
            tags: ['Pets'],
            summary: 'Create a new pet',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: PetRequest,
                    },
                },
            },
            responses: {
                201: {
                    description: 'Pet created successfully',
                    content: {
                        'application/json': {
                            schema: PetResponse,
                        },
                    },
                },
                400: { description: 'Bad request', },
                500: { description: 'Internal server error', },
            },
        },
        get: {
            tags: ['Pets'],
            summary: 'Get all pets',
            responses: {
                200: {
                    description: 'A list of pets',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: PetResponse,
                            },
                        },
                    },
                },
                500: { description: 'Internal server error', },
            },
        },
    },
    '/api/pets/{id}': {
        get: {
            tags: ['Pets'],
            summary: 'Get a pet by ID',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'The ID of the pet (either MongoDB `_id` or `petId`).',
                },
            ],
            responses: {
                200: {
                    description: 'Pet details successfully retrieved',
                    content: {
                        'application/json': {
                            schema: PetResponse,
                        },
                    },
                },
                404: { description: 'Pet not found', },
                500: { description: 'Internal server error', },
            },
        },
        put: {
            tags: ['Pets'],
            summary: 'Update a pet by ID',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'The ID of the pet (either MongoDB `_id` or `petId`).',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: PetRequest,
                    },
                },
            },
            responses: {
                200: {
                    description: 'Pet successfully updated',
                    content: {
                        'application/json': {
                            schema: PetResponse,
                        },
                    },
                },
                400: { description: 'Bad request', },
                404: { description: 'Pet not found', },
                500: { description: 'Internal server error', },
            },
        },
        delete: {
            tags: ['Pets'],
            summary: 'Delete a pet by ID',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'The ID of the pet (either MongoDB `_id` or `petId`).',
                },
            ],
            responses: {
                200: {
                    description: 'Pet successfully deleted',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Pet deleted successfully',
                                    },
                                },
                            },
                        },
                    },
                },
                400: { description: 'Bad request', },
                500: { description: 'Internal server error', },
            },
        },
    },
};
