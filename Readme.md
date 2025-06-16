# Micro-Service Architecture 

This project is a learning setup for understanding and implementing micro-services architecture using Node.js, TypeScript, and PostgreSQL.

## Project Structure

- `user-service/` – Handles user-related logic (authentication, profile, etc.)
- `product-service/` – Manages product data
- `order-service/` – Manages orders and transactions
- `docker-compose.yml` – Runs PostgreSQL, MongoDB, and Adminer via Docker

## 🐳 How to Start the Databases with Docker

This project uses Docker to spin up isolated database containers for each micro-service.

### 1. **Install Docker**

Ensure Docker is installed on your system.  
👉 [Download Docker](https://www.docker.com/)

---

### 2. **Run the Database Containers**

In the root directory of the project, run:

```bash
docker-compose up -d
