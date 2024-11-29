# Pet Management App

## Description

This is a **Pet Management App** built using **Node.js**, **Express.js**, and **MongoDB**. It provides users with the ability to manage a collection of pets. This app supports CRUD operations (Create, Read, Update, Delete) for pets, which includes storing and managing information like `name`, `type`, and `age`.

---

## Requirements

Make sure you have the following installed on your machine:

- **Node.js**: 20.x
- **NPM** (comes with Node.js)
- **MongoDB** (either locally or via Docker)

---

## Getting Started

Follow these steps to set up and run the project:

```bash
# Clone the repository and navigate to the project folder
git clone https://github.com/monte-kotte/js-mongo-pet-app
cd js-mongo-pet-app

# Install the necessary dependencies and Playwright browsers
npm install
```

## Set Up MongoDB Using Docker

If you prefer using Docker for MongoDB, follow these steps:

### Steps:

1. **Ensure Docker is Installed**:
   - Follow the installation instructions for Docker from the [official Docker website](https://www.docker.com/get-started/).

2. **Use Docker Compose to Run MongoDB Locally**:
   - To start MongoDB, run the following command:

```bash
  # Download and start the MongoDB container in detached mode.
  docker-compose up -d

  # Check Running Containers. 
  # You should see your MongoDB container (`pet-app-mongo`) in the output.
  docker ps

  # Stop the MongoDB container and clean up the resources.
  docker-compose down
```

## Set Up MongoDB Locally Using `.env`

Alternatively, you can configure MongoDB locally without Docker by using environment variables.

### Steps:

1. **Install MongoDB Locally**:
   - Follow the installation instructions for MongoDB from [MongoDB Official Docs](https://www.mongodb.com/docs/manual/installation/).

2. **Create and Configure `.env` File**:
   - Create a `.env` file in the root directory of your project.
   - Add the necessary environment variables, such as the MongoDB connection URI. Replace the placeholders with your own configuration:

   ```env
   DB_URI=your_mongo_connection_string
   ```
   - Also you can select custom API port number for starting the app using `.env` file:
   ```env
   API_PORT=your_api_port
   ```

## Run the Application

```bash
  npm start
```

## Postman Collectioт

The project includes a Postman collection and Postman environment for convenient API testing, located in the `postman/` directory.

### 📂 Files Included:
- **`API-pet-collection.postman_collection.json`**: Contains all the API endpoints for interacting with the backend.
- **`API-pet-env.postman_environment.json`**: Defines environment variables (e.g., base URL, API keys) for testing.

### Important Configuration for Postman:
- In case of using environment variables for running the app, don't forget to update the **baseUrl** in your Postman environment to match the API port defined in your `.env` file.
