require('dotenv').config();

const config = {
    port: process.env.API_PORT || 3000,
    dbUri: process.env.DB_URI || 'mongodb://localhost:27017/petApp',
};

module.exports = config;