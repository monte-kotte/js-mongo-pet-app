const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const YAML = require('yamljs');
const path = require('path');

const app = express();

const swaggerDocument = YAML.load(path.resolve(__dirname, '../src/swagger/openapi.yaml'));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cors());
app.use('/api', routes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map((key) => ({
            field: key,
            message: err.errors[key].message,
        }));
        return res.status(400).json({
            message: 'Validation failed',
            errors,
        });
    }

    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = app;
