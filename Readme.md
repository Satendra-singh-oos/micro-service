# Microservice Architecture Demo

This project is a learning setup for understanding and implementing microservices architecture using Node.js, TypeScript, and PostgreSQL.

## 📁 Project Structure

- `user-service/` – Handles user-related logic (authentication, profile, etc.)
- `product-service/` – Manages product data
- `order-service/` – Manages orders and transactions
- `init/` – Contains database initialization SQL
- `docker-compose.yml` – Runs PostgreSQL and Adminer via Docker

## 🐘 How to Start the Database

1. **Install Docker**  
   Make sure Docker is installed on your machine.  
   👉 [Download Docker](https://www.docker.com/)

2. **Run the PostgreSQL Container**

   In the project root directory, run:

   ```bash
   docker-compose up -d
