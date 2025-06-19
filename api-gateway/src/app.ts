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

const app: express.Application = express();

// all the global middleware for security and others

app.use(corsOptions());
app.use(helmetOptions());
app.use(cookieParser());
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(requestIp.mw());
app.use(rateLimiter());
app.use(hpp());

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

app.use("/api/users", userProxy);
app.use("/api/product", productProxy);
app.use("/api/order", orderProxy);

// 404 handler for undefined routes
app.use(notFoundHandler);

// Global error handler
app.use(globalErrorHandler);

export { app };
