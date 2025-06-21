import express from "express";
import requestIp from "request-ip";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import corsOptions from "./middlewares/global/cors";
import helmetOptions from "./middlewares/global/helemt";
import rateLimiter from "./middlewares/global/rateLimiter";
import {
  errorHandler as globalErrorHandler,
  notFoundHandler,
} from "./middlewares/error.handler";
import redis from "./config/redis";
import { userProxy } from "./config/user.proxy";
import { productProxy } from "./config/product.proxy";
import { orderProxy } from "./config/order.proxy";
import {
  verifyAdmin,
  verifyJWT,
  verifyManger,
} from "./middlewares/auth.middelware";

const app: express.Application = express();

app.use(corsOptions());
app.use(helmetOptions());
app.use(cookieParser());
app.use(requestIp.mw());
app.use(rateLimiter());
app.use(hpp());

// User route proxy
app.post("/user-service/login", userProxy);
app.post("/user-service/registration", userProxy);
app.get("/user-service/:id", verifyJWT, userProxy);
app.patch("/user-service/:id", [verifyJWT, verifyAdmin], userProxy);

// Product route proxy
app.post("/product-service/product", [verifyJWT, verifyManger], productProxy);
app.get("/product-service/product/:id", productProxy);
app.get("/product-service/product", productProxy);
app.delete("/product-service/product/:id", productProxy);
app.post("/product-service/category", productProxy);
app.get("/product-service/category", productProxy);

// Order route proxy
app.post("/order-service", orderProxy);

// all the global middleware for security and others

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

app.get("/api/health", async (_req, res) => {
  try {
    res.json({ success: true, message: "Api-GateWay Health Is Good" });
  } catch {
    res.status(500).json({ status: "Redis Unavailable" });
  }
});

app.get("/api/health/redis", async (_req, res) => {
  try {
    const pong = await redis.ping();
    res.json({ success: true, message: "Redis Health Is Good", status: pong });
  } catch {
    res.status(500).json({ status: "Redis Unavailable" });
  }
});

// 404 handler for undefined routes
app.use(notFoundHandler);

// Global error handler
app.use(globalErrorHandler);

export { app };
