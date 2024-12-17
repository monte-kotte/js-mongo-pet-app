# Pet Adoption App - Backend

## Description

This is the **backend** part of the **Pet Adoption App**. It is built using **Node.js**, **Express.js**, and **MongoDB**. The backend exposes a **RESTful API** for managing pet data, allowing users to perform CRUD operations on pets.

---

## Features

- **RESTful API** built with **Express.js**.
- **MongoDB** for data persistence.
- Full support for **CRUD** operations (Create, Read, Update, Delete) for managing pets.
- Validation of pet data, including fields like `name`, `type`, and `age`.

---

## Tech Stack

- **Node.js** (JavaScript runtime)
- **Express.js** (Web framework)
- **MongoDB** (Database)
- **Mongoose** (ODM for MongoDB)
- **dotenv** (for environment variable management)

---

## Swagger API

Swagger UI is available to explore and test the API once the server is running.

### 🚀 **API Documentation (Swagger)**:
[PET application Swagger API](http://localhost:3000/swagger/)

---

### How to Access Swagger:

1. Start the backend server on your local machine.
2. Open your browser and navigate to the Swagger URL above. By default, **PORT=3000** is used (can be configured via `.env`).
3. Explore available endpoints, test API requests, and view detailed documentation
---

## Postman Collection

The project includes a Postman collection and Postman environment for convenient API testing, located in the `postman/` directory.

### 📂 Files Included:
- **`API-pet-collection.postman_collection.json`**: Contains all the API endpoints for interacting with the backend.
- **`API-pet-env.postman_environment.json`**: Defines environment variables (e.g., base URL, API keys) for testing.
---

## Configuration Notes

- To use environment variables, ensure the `.env` files is properly configured.
- Update the **baseUrl** in your Postman environment and the **PORT** in `openapi.yaml` to match the server's running port.

---
