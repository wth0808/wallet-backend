import { Redis } from "@upstash/redis";
import pkg from "@upstash/ratelimit"; // CommonJS import
import "dotenv/config";

const { Ratelimit } = pkg; // Extract the class

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(50, "60s"), // ✅ Use the static method
});

export default ratelimit;
