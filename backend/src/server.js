const mongoose = require('mongoose');
const app = require('./app.js');
const { ensureDefaultPet } = require('./utils/db-setup.js');
const config = require('./config/config.js');

mongoose.connect(config.dbUri)
    .then(async () => {
        console.log('Connected to MongoDB');
        await ensureDefaultPet();
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
            console.log(`Swagger http://localhost:${config.port}/swagger`);
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
