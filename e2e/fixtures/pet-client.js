export class PetClient {
    constructor(request) {
        this.request = request;
    }

    async create(petData) {
        return this.request.post('/api/pets', { data: petData });
    }

    async getById(petId) {
        return this.request.get(`/api/pets/${petId}`);
    }

    async getAll() {
        return this.request.get('/api/pets');
    }

    async update(petId, petData) {
        return this.request.put(`/api/pets/${petId}`, { data: petData });
    }

    async delete(petId) {
        return this.request.delete(`/api/pets/${petId}`);
    }
}
