import Redis from "ioredis";

export const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT || 6379),

  maxRetriesPerRequest: 1,

  retryStrategy() {
    return null;
  },
});

redis.on("connect", () => {
  console.log("✅ Connected to Redis");
});

redis.on("error", () => {
  // Optional: suppress repeated logs or log once
});
