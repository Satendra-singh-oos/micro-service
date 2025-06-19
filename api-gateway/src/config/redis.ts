import Redis from "ioredis";
import env from "../utils/env";

const redis = new Redis({
  host: env.REDIS_HOST || "localhost",
  port: Number(env.REDIS_PORT) || 6379,
  password: env.REDIS_PASSWORD || undefined,
});

export const connectRedis = async () => {
  return new Promise<void>((resolve, reject) => {
    redis.on("connect", () => {
      console.log(" Redis connected successfully");
      resolve();
    });

    redis.on("error", (err) => {
      console.error("Redis connection error:", err);
      reject(err);
    });
  });
};

export default redis;
