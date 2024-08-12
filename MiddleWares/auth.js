const jwt = require("jsonwebtoken");
const asyncWrapper=require("./asyncWrapper")
const User=require("../models/user-model")
require("dotenv").config();
const costumeError=require("../utils/customeError")

const Autherizarion = asyncWrapper(async function (req, res, next) {
  const token = req.body.token;
    const auth = jwt.verify(token, process.env.JWT_SECRET);
    if (auth) {
      const user=await User.findById(auth.UserId);
      if(user){
      if(user.exp==-1||user.exp<=auth.exp){
        if(auth.update)
          await user.updateOne({exp:auth.exp})
      }}
      else
        throw new costumeError("invalid token",400)
      req.UserId = auth.UserId;
      return next();
  }});

module.exports = { Autherizarion };
