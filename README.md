# Pet Adoption App

## Description

This is a **Pet Adoption App** built using **Node.js**, **Express.js**, **MongoDB**, and **React** with **Vite**. It provides users with the ability to manage a collection of pets.

---

## Features

### Backend
- **RESTful API** built with **Express.js**.
- **MongoDB** for data persistence.
- Full support for CRUD operations.
- Validation of input data for pets (e.g., `name`, `type`, `age`).

### Frontend
- Built with **React** and **Vite** for a fast and modern development environment.
- Interactive UI for managing pets.
- Integration with the backend API for dynamic data fetching and manipulation.

---

## Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose** (for database schema and validation)

### Frontend
- **React**
- **Vite**

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

# Install the necessary dependencies (for api and ui)
npm run install-all
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

# Stop the MongoDB containers and clean up resources. -v flag will remove volumes associated with the containers.
  docker-compose down -v
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
   VITE_API_PORT=your_api_port
   ```

## Run the Application (server and client)

```bash
  npm start
```
