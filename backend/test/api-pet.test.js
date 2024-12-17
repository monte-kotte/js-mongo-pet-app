const supertest = require("supertest");
const app = require("../src/app");
const { startMongoContainer, stopMongoContainer } = require("./test-setup.js");

beforeAll(async () => {
    await startMongoContainer();
});

afterAll(async () => {
    await stopMongoContainer();
});

describe("API: Pets - Positive cases", () => {
    test("POST /api/pets - Create Pet", async () => {
        const testPet = {
            name: "Sid",
            type: "cat",
            age: 4.7,
        };
        // Step 1: Create Pet via POST request
        const response = await supertest(app)
            .post("/api/pets")
            .send(testPet)
            .expect(201);
        // Step 2: Validate response
        expect(response.body).toHaveProperty("petId");
        expect(response.body.name).toBe(testPet.name);
        expect(response.body.type).toBe(testPet.type);
        expect(response.body.age).toBe(testPet.age);
    });

    test("GET /api/pets/:id - Get Pet by ID", async () => {
        const testPet = {
            name: "Jack",
            type: "rabbit",
            age: 1.1,
        };
        // Step 1: Create Pet via POST request
        const postResponse = await supertest(app)
            .post("/api/pets")
            .send(testPet)
            .expect(201);
        const petId = postResponse.body.petId;

        // Step 2: Get the same Pet via GET request using petId
        const response = await supertest(app)
            .get(`/api/pets/${petId}`)
            .expect(200);
        // Step 3: Validate response
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
        const testPet = {
            name: "Anna",
            type: "cat",
            age: 2,
        };
        // Step 1: Create Pet via POST request
        const postResponse = await supertest(app)
            .post("/api/pets")
            .send(testPet)
            .expect(201);
        const petId = postResponse.body.petId;

        // Step 2: Update Pet via PUT request
        const updatedPet = {
            name: "Anna-M",
            type: "dog",
            age: 2.5,
        };

        const response = await supertest(app)
            .put(`/api/pets/${petId}`)
            .send(updatedPet)
            .expect(200);

        // Step 3: Validate response
        expect(response.body.petId).toBe(petId);
        expect(response.body.name).toBe(updatedPet.name);
        expect(response.body.type).toBe(updatedPet.type);
        expect(response.body.age).toBe(updatedPet.age);
    });

    test("DELETE /api/pets/:id - Delete Pet", async () => {
        const testPet = {
            name: "Mari",
            type: "rabbit",
            age: 3,
        };
        // Step 1: Create Pet via POST request
        const postResponse = await supertest(app)
            .post("/api/pets")
            .send(testPet)
            .expect(201);
        const petId = postResponse.body.petId;

        // Step 2: Delete Pet
        const response = await supertest(app)
            .delete(`/api/pets/${petId}`)
            .expect(200);

        // Step 3: Check that pet was deleted
        expect(response.body).toHaveProperty("message", "Pet deleted successfully");
        await supertest(app)
            .get(`/api/pets/${petId}`)
            .expect(404);
    });
});
