#  Microservices Architecture

This project is a learning-focused setup to explore and implement **microservices architecture** using **Node.js**, **TypeScript**, **PostgreSQL**, **Redis**, **MongoDB (Atlas)**, and **Kafka**.

---

## Project Structure

- `api-gateway/` – Centralized entry point. Verifies JWT tokens, user roles, and routes requests to respective services.
- `user-service/` – Handles user-related logic (authentication, profile, etc.) with PostgreSQL  
- `product-service/` – Manages product data using **MongoDB**  
- `order-service/` – Manages orders and transactions using PostgreSQL  
- `docker-compose.yml` – Manages local infrastructure: PostgreSQL, Redis, Kafka, Zookeeper, Kafka UI, Redis Insight, and Adminer

---

##  API Gateway

All client requests go through the **API Gateway**, which performs:

- ✅ **JWT Verification** – Ensures the token is valid
- ✅ **User Role Check** – Validates if the user has required permissions
- ✅ **Redis Session Validation** – Connects to Redis to confirm user presence using `userId` from the JWT payload
- ✅ **Routing** – Forwards the request to appropriate microservices



---

##  Running Everything with Docker

This project uses Docker Compose to spin up essential services required for local development.

### ✅ Prerequisite

Install Docker on your machine:  
👉 [Get Docker](https://www.docker.com/)

---

###  Start All Services

Run the following command from the root of the project:

```bash
docker-compose up -d
```

This will start:

- PostgreSQL containers for `user-service` and `order-service`
- Redis and RedisInsight (for caching and inspection)
- Zookeeper and Kafka (`event-broker`)
- Kafka UI (management dashboard)
- Adminer (PostgreSQL GUI)

---

##  Kafka Topics and Event Flow

- `order-service` publishes an event to the `order-created` topic when a new order is created.
- `product-service` consumes the `order-created` event to update the product stock.

You can monitor events and topics via Kafka UI:  
🔗 [Kafka UI – localhost:8082](http://localhost:8082)

---

##  MongoDB Setup (Product Service)

Currently, `product-service` uses **MongoDB Atlas** instead of a local Docker container.  
Make sure to configure your MongoDB connection string in the product service’s environment file:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbName>?retryWrites=true&w=majority
```

> 💡 NOTE :  add MongoDB to Docker later if you want to make the setup fully containerized.

---

##  Environment Variables Example (`.env.example`)
-> Each service contains a `.env.sample` file for environment configuration. Copy and rename it to `.env` inside the respective service directory and fill in your own values.


---



