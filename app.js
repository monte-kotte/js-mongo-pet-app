const express = require('express');
const mongoose = require('mongoose');
const petRoutes = require('./routes/pet-routes');  // Ensure this file is correct

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use('/api', petRoutes);  // API routes will be prefixed with /api

// MongoDB connection (adjust the URI if running in Docker)
mongoose
    .connect('mongodb://localhost:27017/petApp')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); // Exit if the connection fails
    });

// 404 Error Handling
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Generic Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});
