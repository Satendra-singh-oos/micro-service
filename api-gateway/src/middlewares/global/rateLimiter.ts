import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import { ApiError } from "../../utils/AppError";

const rateLimiter = (): RateLimitRequestHandler => {
  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5000, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (_, __, ___, options) => {
      throw new ApiError(
        options.statusCode || 500,
        `There are too many requests. You are only allowed ${
          options.limit
        } requests per ${options.windowMs / 60000} minutes`
      );
    },
  });
};

export default rateLimiter;
