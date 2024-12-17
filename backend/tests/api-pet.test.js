const supertest = require("supertest");
const app = require("../src/app.js");
const { startMongoContainer, stopMongoContainer } = require("./test-setup.js");
const { generateTestPet } = require("./utils/pet-gen.js");

beforeAll(async () => {
    await startMongoContainer();
});

afterAll(async () => {
    await stopMongoContainer();
});

describe("API: Pets - Positive cases", () => {
    test("POST /api/pets - Create Pet", async () => {
        const testPet = generateTestPet();

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
        const testPet = generateTestPet();

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
        const testPet = generateTestPet();
        const updatedPet = generateTestPet();

        // Step 1: Create Pet via POST request
        const postResponse = await supertest(app)
            .post("/api/pets")
            .send(testPet)
            .expect(201);
        const petId = postResponse.body.petId;

        // Step 2: Update Pet via PUT request
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
        const testPet = generateTestPet();

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
        expect(response.body.message).toBe("Pet deleted successfully");
        await supertest(app)
            .get(`/api/pets/${petId}`)
            .expect(404);
    });
});
