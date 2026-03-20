# Medley

Medley is a full-stack application composed of a React frontend, a Spring Boot backend, an AI service, and a MySQL database. The project is fully dockerized and can be run using Docker Compose.

## Architecture

The project is divided into several services:

- **Frontend:** Built with React, Vite, and Tailwind CSS.
- **Backend:** A Java Spring Boot application.
- **AI Service:** A dedicated service for AI functionalities.
- **Database:** MySQL 8.0 instance.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js & npm (for local frontend development)
- Java 17+ & Maven (for local backend development)

## Getting Started

### Running with Docker (Recommended)

The easiest way to get the entire application up and running is to use Docker Compose.

1. Navigate to the project directory:
   ```bash
   cd medlye
   ```

2. Start the services:
   ```bash
   docker-compose up --build
   ```

3. Access the services:
   - **Frontend:** http://localhost:80
   - **Backend API:** http://localhost:8080
   - **AI Service:** http://localhost:8000
   - **Database:** localhost:3306

### Local Development

If you prefer to run the services locally without Docker, follow the steps below.

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd medlye/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

#### Backend

1. Navigate to the backend directory:
   ```bash
   cd medlye/backend
   ```

2. Ensure you have a local MySQL instance running and configure the `application.properties` or environment variables accordingly.

3. Build and run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

## Project Structure

- `medlye/frontend/`: Contains the React application code.
- `medlye/backend/`: Contains the Spring Boot backend code.
- `medlye/ai-service/`: Source code for the AI microservice.
- `medlye/docker-compose.yml`: Docker configuration file for multi-container orchestration.
- `medlye/database_schema.sql`: Initial SQL schema for the database.
- `medlye/er_diagram.md`: ER Diagram for the database structures.
