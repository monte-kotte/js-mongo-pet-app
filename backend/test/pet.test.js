const supertest = require("supertest");
const mongoose = require("mongoose");
const { GenericContainer } = require("testcontainers");
const app = require("../../backend/src/app");

let mongoContainer;
let mongoUri;

beforeAll(async () => {
    // Start MongoDB container via Testcontainers
    mongoContainer = await new GenericContainer("mongo")
        .withExposedPorts(27017)
        .start();

    mongoUri = `mongodb://${mongoContainer.getHost()}:${mongoContainer.getMappedPort(27017)}`;

    // Connect Mongoose to MongoDB
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    // Close DB connection and stop container
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoContainer.stop();
});

const testPet = {
    name: "Sid",
    type: "cat",
    age: 4.7,
};

describe("API: Pets", () => {
    let petId;

    test("POST /api/pets - Create Pet", async () => {


        const response = await supertest(app)
            .post("/api/pets")
            .send(testPet)
            .expect(201);

        petId = response.body.petId;

        expect(response.body).toHaveProperty("petId");
        expect(response.body.name).toBe(testPet.name);
        expect(response.body.type).toBe(testPet.type);
        expect(response.body.age).toBe(testPet.age);
    });

    test("GET /api/pets/:id - Get Pet by ID", async () => {
        const response = await supertest(app)
            .get(`/api/pets/${petId}`)
            .expect(200);

        expect(response.body.petId).toBe(petId);
        expect(response.body.name).toBe(testPet.name);
        expect(response.body.type).toBe(testPet.type);
        expect(response.body.age).toBe(testPet.age);
    });

    test("GET /api/pets - Get All Pets", async () => {
        const response = await supertest(app)
            .get("/api/pets")
            .expect(200);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("PUT /api/pets/:id - Update Pet", async () => {
        const updatedPet = {
            name: "Jack",
            type: "dog",
            age: 5,
        };

        const response = await supertest(app)
            .put(`/api/pets/${petId}`)
            .send(updatedPet)
            .expect(200);

        expect(response.body.petId).toBe(petId);
        expect(response.body.name).toBe(updatedPet.name);
        expect(response.body.type).toBe(updatedPet.type);
        expect(response.body.age).toBe(updatedPet.age);
    });

    test("DELETE /api/pets/:id - Delete Pet", async () => {
        const response = await supertest(app)
            .delete(`/api/pets/${petId}`)
            .expect(200);

        expect(response.body).toHaveProperty("message", "Pet deleted successfully");

        await supertest(app)
            .get(`/api/pets/${petId}`)
            .expect(404);
    });
});
