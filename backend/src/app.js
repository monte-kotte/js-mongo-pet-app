const express = require('express');
const cors = require('cors');
const petRoutes = require('./routes/pet.routes.js');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', petRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = app;
