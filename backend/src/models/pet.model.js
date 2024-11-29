const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['cat', 'dog', 'rabbit'],
        required: true
    },
    age: {
        type: Number,
        required: true
    },
}, { timestamps: true });

petSchema.plugin(mongooseSequence, { inc_field: 'petId' });

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;
