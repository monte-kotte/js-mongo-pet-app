const apiPort = import.meta.env.VITE_API_PORT || 3000;
export const apiBaseUrl = `http://localhost:${apiPort}`;

export const API_PETS_URL = `${apiBaseUrl}/api/pets`;
export const API_SWAGGER_URL = `${apiBaseUrl}/swagger`;
