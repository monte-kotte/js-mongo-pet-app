require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app.js');
const { ensureDefaultPet } = require('./utils/db-setup.js');

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/petApp';

mongoose.connect(DB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        await ensureDefaultPet();
        const port = process.env.API_PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });

process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
    }
});
