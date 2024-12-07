const express = require('express');
const petRoutes = require('./pet.routes');

const router = express.Router();

router.use('/', petRoutes);

module.exports = router;
