const jwt = require("jsonwebtoken");
const asyncWrapper = require("./asyncWrapper");
const User = require("../models/user-model");
require("dotenv").config();
const ApiError = require("../utils/ApiError");

const Autherizarion = asyncWrapper(async function (req, res, next) {
  const token = req.get("Authorization").split(" ")[1];
  const auth = jwt.verify(token, process.env.JWT_SECRET);
  if (auth) {
    const user = await User.findOne({
      where: {
        userId: auth.userId,
      },
    });
    if (user) {
      if (user.exp == -1 || user.exp <= auth.exp) {
        if (auth.update) {
          await user.update({ exp: auth.exp });
        }
      }
      else throw new ApiError("invalid token", 400);
    } else throw new ApiError("invalid token", 400);
    req.userId = auth.userId;
    return next();
  }
});

module.exports = { Autherizarion };
