import { expect, test } from '@playwright/test';
import { PetClient } from '../fixtures/pet-client.js';
const { generateTestPet } = require("../utils/pet-gen.js");

test('CRUD pet test', async ({ request }) => {
    const petClient = new PetClient(request);
    const testPet = generateTestPet();
    let petId;

    await test.step('create', async () => {
        const createResponce = await petClient.create(testPet);
        expect(createResponce.ok()).toBeTruthy();
        const createdPet = await createResponce.json();
        expect(createdPet).toMatchObject(expect.objectContaining(testPet));
        petId = createdPet.petId;
    });

    await test.step('get by id', async () => {
        const getResponce = await petClient.getById(petId);
        expect(getResponce.ok()).toBeTruthy();

        const recivedPet = await getResponce.json();
        expect(recivedPet).toMatchObject(expect.objectContaining(testPet));
    });

    await test.step('update', async () => {
        const testUpdatedPet = generateTestPet();
        const updateResponce = await petClient.update(petId, testUpdatedPet);
        expect(updateResponce.ok()).toBeTruthy();

        const updatedPet = await updateResponce.json();
        expect(updatedPet).toMatchObject(expect.objectContaining(testUpdatedPet));
    });

    await test.step('delete', async () => {
        const deleteResponce = await petClient.delete(petId);
        expect(deleteResponce.ok()).toBeTruthy();

        const getDeletedResponce = await petClient.getById(petId);
        expect(getDeletedResponce.status()).toBe(404);
    });
})
