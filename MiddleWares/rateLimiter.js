const { rateLimit } = require("express-rate-limit");
const ApiError = require("../utils/ApiError");

class limiter {
  normalLimiter() {
    return rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 300,
      standardHeaders: "draft-7",
      legacyHeaders: false,
      handler: () => {
        throw new ApiError("Too many requests");
      },
    });
  }
  loginLimiter() {
    return rateLimit({
      windowMs: 5 * 60 * 1000,
      limit: 5,
      standardHeaders: "draft-7",
      legacyHeaders: false,
      handler: () => {
        throw new ApiError("Too many requests");
      },
    });
  }
  confirmLimiter() {
    return rateLimit({
      windowMs: 5 * 60 * 1000,
      limit: 5,
      standardHeaders: "draft-7",
      legacyHeaders: false,
      handler: () => {
        throw new ApiError("Too many requests");
      },
    });
  }
}

module.exports = new limiter();
