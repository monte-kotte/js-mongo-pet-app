import { test, expect } from '@playwright/test'
const { generateTestPet } = require("../utils/pet-gen.js");

test('CRUD pet test', async ({ request }) => {
    const testPet = generateTestPet();
    let petId;

    await test.step('create', async () => {
        const createResponce = await request.post('/api/pets', {
            data: testPet
        });
        expect(createResponce.ok()).toBeTruthy();
        const createdPet = await createResponce.json();
        expect(createdPet).toMatchObject(expect.objectContaining(testPet));
        petId = createdPet.petId;
    });

    await test.step('get by id', async () => {
        const getResponce = await request.get(`/api/pets/${petId}`);
        expect(getResponce.ok()).toBeTruthy();

        const recivedPet = await getResponce.json();
        expect(recivedPet).toMatchObject(expect.objectContaining(testPet));
    });

    await test.step('update', async () => {
        const testUpdatedPet = generateTestPet();
        const updateResponce = await request.put(`/api/pets/${petId}`, {
            data: testUpdatedPet
        });
        expect(updateResponce.ok()).toBeTruthy();

        const updatedPet = await updateResponce.json();
        expect(updatedPet).toMatchObject(expect.objectContaining(testUpdatedPet));
    });

    await test.step('delete', async () => {
        const deleteResponce = await request.delete(`/api/pets/${petId}`)
        expect(deleteResponce.ok()).toBeTruthy();

        const getDeletedResponce = await request.get(`/api/pets/${petId}`);
        expect(getDeletedResponce.status()).toBe(404);
    });
})
