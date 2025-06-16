import express from "express";
import requestIp from "request-ip";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import corsOptions from "./middlewares/global/cors";
import helmetOptions from "./middlewares/global/helemt";
import rateLimiter from "./middlewares/global/rateLimiter";
const app: express.Application = express();

// all the global middleware for security and others

app.use(corsOptions());
app.use(helmetOptions());
app.use(rateLimiter());
app.use(cookieParser());
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(requestIp.mw());
app.use(rateLimiter());
app.use(hpp());

export { app };
