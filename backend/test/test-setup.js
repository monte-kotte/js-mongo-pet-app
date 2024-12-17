const mongoose = require("mongoose");
const { GenericContainer } = require("testcontainers");

let mongoContainer;
let mongoUri;

const startMongoContainer = async () => {
    mongoContainer = await new GenericContainer("mongo")
        .withExposedPorts(27017)
        .start();

    mongoUri = `mongodb://${mongoContainer.getHost()}:${mongoContainer.getMappedPort(27017)}`;
    await mongoose.connect(mongoUri);
};

const stopMongoContainer = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoContainer.stop();
};

module.exports = { startMongoContainer, stopMongoContainer };
