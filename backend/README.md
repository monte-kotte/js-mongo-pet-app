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

## Postman Collection

The project includes a Postman collection and Postman environment for convenient API testing, located in the `postman/` directory.

### 📂 Files Included:
- **`API-pet-collection.postman_collection.json`**: Contains all the API endpoints for interacting with the backend.
- **`API-pet-env.postman_environment.json`**: Defines environment variables (e.g., base URL, API keys) for testing.

### Important Configuration for Postman:
- In case of using environment variables for running the app, don't forget to update the **baseUrl** in your Postman environment to match the API port defined in your `.env` file.
