const jwt = require("jsonwebtoken");
require("dotenv").config();

const Autherizarion = function (req, res, next) {
  try {
    const token = req.body.token;
    if (token) {
      const auth = jwt.verify(token, process.env.JWT_SECRET);
      if (auth) {
        req.UserId = auth.UserId;
        return next();
      }
    }
  } catch (error) {
    return res.status(404).json({
      status: 0,
      message: "Not Autherized",
    });
  }
};

module.exports = { Autherizarion };
