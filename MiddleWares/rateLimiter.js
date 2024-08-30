const { rateLimit } = require("express-rate-limit");
const ApiError = require("../utils/ApiError");

const limiter =function(){

      return rateLimit({
      windowMs: 1 * 60 * 1000,
      limit: 500,
      standardHeaders: "draft-7",
      legacyHeaders: false,
      handler: () => {
        throw new ApiError("Too many requests");
      }
})}

module.exports = limiter;
