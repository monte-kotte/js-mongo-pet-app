import { expect } from '@playwright/test';
const { generateTestPet } = require("../utils/pet-gen.js");
import { test } from '../fixtures/test-setup.js'

test('CRUD pet test', async ({ apiClient }) => {
    const testPet = generateTestPet();
    let petId;

    await test.step('create', async () => {
        const createdPet = await apiClient
            .path("/api/pets")
            .body(testPet)
            .postRequest(201)

        expect(createdPet).toMatchObject(expect.objectContaining(testPet));
        petId = createdPet.petId;
    });

    await test.step('get by id', async () => {
        const recivedPet = await apiClient
            .path(`/api/pets/${petId}`)
            .getRequest(200);
        expect(recivedPet).toMatchObject(expect.objectContaining(testPet));
    });

    await test.step('update', async () => {
        const testUpdatedPet = generateTestPet();
        const updatedPet = await apiClient
            .path(`/api/pets/${petId}`)
            .body(testUpdatedPet)
            .putRequest(200);
        expect(updatedPet).toMatchObject(expect.objectContaining(testUpdatedPet));
    });

    await test.step('delete', async () => {
        await apiClient
            .path(`/api/pets/${petId}`)
            .deleteRequest(200);

        await apiClient
            .path(`/api/pets/${petId}`)
            .getRequest(404);
    });
})
