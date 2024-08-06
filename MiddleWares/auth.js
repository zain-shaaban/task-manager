const jwt = require("jsonwebtoken");
require("dotenv").config();

const Autherizarion = function (req, res, next) {
  try {
    const token = req.body.token;
      const auth = jwt.verify(token, process.env.JWT_SECRET);
      if (auth) {
        req.UserId = auth.UserId;
        return next();
      }
    }catch (error) {
      error.message= "Not Autherized";
      next(error);
    };
  };

module.exports = { Autherizarion };
