module.exports = {
    type: 'object',
    properties: {
        _id: {
            type: 'string',
            description: 'MongoDB unique identifier',
        },
        petId: {
            type: 'integer',
            description: 'Unique identifier for the pet',
        },
        name: {
            type: 'string',
            description: 'Name of the pet',
        },
        type: {
            type: 'string',
            enum: ['cat', 'dog', 'rabbit'],
            description: 'Type of the pet',
        },
        age: {
            type: 'integer',
            description: 'Age of the pet',
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Creation timestamp',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last updated timestamp',
        },
        __v: {
            type: 'integer',
            description: 'Version key',
        },
    },
    required: ['name', 'type', 'age'],
};
