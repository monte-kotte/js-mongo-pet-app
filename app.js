const express = require('express');
const mongoose = require('mongoose');
const petRoutes = require('./routes/pet-routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', petRoutes);

mongoose
    .connect('mongodb://localhost:27017/petApp')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});
