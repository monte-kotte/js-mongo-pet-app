# Pet Management App

## Description

This is a **Pet Management App** built using **Node.js**, **Express.js**, and **MongoDB**. It provides users with the ability to manage a collection of pets. This app supports CRUD operations (Create, Read, Update, Delete) for pets, which includes storing and managing information like `name`, `type`, and `age`.

---

## Requirements

Make sure you have the following installed on your machine:

- **Node.js**: 20.x
- **NPM** (comes with Node.js)
- **Docker** (for hosting a MongoDB container)

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

To run MongoDB locally using Docker, we use **Docker Compose**. Ensure that Docker is installed on your system.

### Steps:

```bash
  # Download and start the MongoDB container in detached mode.
  docker-compose up -d

  # Check Running Containers. 
  # You should see your MongoDB container (`pet-app-mongo`) in the output.
  docker ps

  # Stop the MongoDB container and clean up the resources.
  docker-compose down
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
