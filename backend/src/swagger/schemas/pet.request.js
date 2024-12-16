module.exports = {
    type: 'object',
    properties: {
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
            type: 'number',
            description: 'Age of the pet',
        },
    },
    required: ['name', 'type', 'age'],
};
