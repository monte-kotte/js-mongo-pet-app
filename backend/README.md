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

The Swagger API documentation is available once the server is running. You can access it through the following link:

### 🚀 **API Documentation (Swagger)**:
[Swagger API](http://localhost:{your_api_port}/swagger/)

Replace `{your_api_port}` with the actual port number your backend server is running on. For example:

- **If your API is running on port 3000**: [http://localhost:3000/swagger/](http://localhost:3000/swagger/)

---

### How to Access Swagger:

1. Make sure the server is running on your local machine.
2. Open your browser and navigate to the link above, replacing `{your_api_port}` with the actual port your server is running on.
3. You will be able to explore the full API documentation, view all available endpoints, and try out API requests directly from the Swagger UI.

---

## Postman Collection

The project includes a Postman collection and Postman environment for convenient API testing, located in the `postman/` directory.

### 📂 Files Included:
- **`API-pet-collection.postman_collection.json`**: Contains all the API endpoints for interacting with the backend.
- **`API-pet-env.postman_environment.json`**: Defines environment variables (e.g., base URL, API keys) for testing.

### Important Configuration for Postman:
- In case of using environment variables for running the app, don't forget to update the **baseUrl** in your Postman environment to match the API port defined in your `.env` file.

---
