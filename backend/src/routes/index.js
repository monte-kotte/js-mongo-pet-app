const express = require('express');
const petRoutes = require('./pets.routes');

const router = express.Router();

router.use('/pets', petRoutes);

module.exports = router;
