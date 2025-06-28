import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const result = await ratelimit.limit("my-rate-limit-key");
    console.log(result);

    if (!result.success) {
      return res.status(429).json({
        error: "Rate limit exceeded. Please try again later.",
      });
    }
    next();
  } catch (error) {
    console.error("Rate limit error:", error);
    next(error);
  }
};

export default rateLimiter;
