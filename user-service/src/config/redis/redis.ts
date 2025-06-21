// config/redis/redis.ts
import Redis from "ioredis";
import env from "../../utils/env";

const redis = new Redis({
  host: env.REDIS_HOST || "localhost",
  port: Number(env.REDIS_PORT) || 6379,
  password: env.REDIS_PASSWORD || undefined,
  enableReadyCheck: false,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
});

export const connectRedis = async () => {
  try {
    await redis.connect();
    console.log("✅ Redis connected successfully");
    return true;
  } catch (err: any) {
    console.warn(
      "⚠️  Redis connection failed, continuing without Redis:",
      err.message
    );
    return false;
  }
};

// Handle Redis events
redis.on("connect", () => {
  console.log("🔄 Redis connecting...");
});

redis.on("ready", () => {
  console.log("✅ Redis ready");
});

redis.on("error", (err) => {
  console.warn("⚠️  Redis error (service will continue):", err.message);
});

redis.on("close", () => {
  console.warn("⚠️  Redis connection closed");
});

export default redis;
