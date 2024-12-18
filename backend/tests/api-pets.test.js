const supertest = require("supertest");
const app = require("../src/app.js");
const { startMongoContainer, stopMongoContainer } = require("./test-setup.js");
const { generateTestPet } = require("./utils/pet-gen.js");

beforeAll(async () => {
    await startMongoContainer();
}, 20000);

afterAll(async () => {
    await stopMongoContainer();
}, 20000);

describe("API: Pets - Positive cases", () => {
    test("POST /api/pets - Create Pet", async () => {
        const testPet = generateTestPet();

        // Step 1: Create Pet
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

        // Step 1: Create Pet
        const postResponse = await supertest(app)
            .post("/api/pets")
            .send(testPet)
            .expect(201);
        const petId = postResponse.body.petId;

        // Step 2: Get the same Pet using petId
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

        // Step 1: Create Pet
        const postResponse = await supertest(app)
            .post("/api/pets")
            .send(testPet)
            .expect(201);
        const petId = postResponse.body.petId;

        // Step 2: Update Pet
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

        // Step 1: Create Pet
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

describe("API: Pets - Negative cases", () => {
    test("POST /api/pets - Validate errors on Create Pet with Invalid data", async () => {
        const testPet = generateTestPet();

        // Case 1: Try to Create Pet with unsupported pet type
        testPet.type = "hamster";
        const response = await supertest(app)
            .post("/api/pets")
            .send(testPet)
            .expect(422);
        expect(response.body.message).toEqual("Invalid pet type: 'hamster'.");

        // Case 2: Try to Create Pet with empty pet type
        testPet.type = "";
        const response2 = await supertest(app)
            .post("/api/pets")
            .send(testPet)
            .expect(400);
        expect(response2.body.message).toEqual("All fields (name, type, age) are required.");

        // Case 3: Try to Create Pet with NaN age
        testPet.type = "cat";
        testPet.age = "string";
        const response3 = await supertest(app)
            .post("/api/pets")
            .send(testPet)
            .expect(422);
        expect(response3.body.message).toEqual("Age must be a number.");
    });

    test("GET /api/pets/:id - Validate error on Get not existing pet", async () => {
        const response = await supertest(app)
            .get(`/api/pets/10000000`)
            .expect(404);
        expect(response.body.message).toEqual("Pet not found.");
    });

    test("PUT /api/pets/:id - Validate errors on Update Pet with Invalid data", async () => {
        const testPet = generateTestPet();
        const updatedPet = generateTestPet();

        // Create Pet
        const postResponse = await supertest(app)
            .post("/api/pets")
            .send(testPet)
            .expect(201);
        const petId = postResponse.body.petId;

        // Case 1: Try to Update Pet with unsupported pet type
        updatedPet.type = "hamster";
        const response = await supertest(app)
            .put(`/api/pets/${petId}`)
            .send(updatedPet)
            .expect(422);
        expect(response.body.message).toEqual("Invalid pet type: 'hamster'.");

        // Case 2: Try to Update Pet with empty pet type
        updatedPet.type = "";
        const response2 = await supertest(app)
            .put(`/api/pets/${petId}`)
            .send(updatedPet)
            .expect(400);
        expect(response2.body.message).toEqual("All fields (name, type, age) are required.");

        // Case 3: Try to Update Pet with NaN age
        updatedPet.type = "cat";
        updatedPet.age = "string";
        const response3 = await supertest(app)
            .put(`/api/pets/${petId}`)
            .send(updatedPet)
            .expect(422);
        expect(response3.body.message).toEqual("Age must be a number.");

        // Case 4: Try to Update not existing Pet
        const response4 = await supertest(app)
            .put(`/api/pets/0`)
            .send(testPet)
            .expect(404);
        expect(response4.body.message).toEqual("Pet not found.");
    });

    test("DELETE /api/pets/:id - Validate error on DELETE not existing pet", async () => {
        const response = await supertest(app)
            .get(`/api/pets/10000000`)
            .expect(404);
        expect(response.body.message).toEqual("Pet not found.");
    });
});
