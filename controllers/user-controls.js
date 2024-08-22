require("dotenv").config();
const User = require("../models/user-model");
const Task = require("../models/task-model");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../MiddleWares/asyncWrapper");
const transporter = require("../MiddleWares/transporter");
const ApiError = require("../utils/ApiError");

const register = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;
  const confirm_key=Math.round(Math.random()*10e3)
  const newUser = await User.create({ name, email, password,confirm_key });
  const token = jwt.sign({ UserId: newUser._id }, process.env.AUTH_SECRET, {
    expiresIn: "1d",
  });
  transporter(email, confirm_key);
  res.status(201).json({
    status: 1,
    data: null,
  });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new ApiError("email or password is incorrect", 500);
  if (!user.confirmed)
    throw new ApiError("the email is unconfirmed", 500);
  if (!user.Auth(password))
    throw new ApiError("email or password is incorrect", 500);
  const token = jwt.sign({ UserId: user._id }, process.env.JWT_SECRET, {
    expiresIn: 1000 * 60 * 60 * 24 * 30,
  });
  res.status(200).json({
    status: 1,
    data: { token },
  });
});

const updateUser = asyncWrapper(async (req, res) => {
  const { name, email, password, appearance, auto_delete } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: req.UserId },
    { name, email, password, appearance, auto_delete },
    { new: true, runValidators: true }
  );
  if (password) {
    const token = jwt.sign(
      { UserId: user._id,update:true},
      process.env.JWT_SECRET,
      {
        expiresIn: 1000 * 60 * 60 * 24 * 30,
      }
    );
    res.status(200).json({
      status: 1,
      data: { token },
    });
  } else {
    res.status(200).json({
      status: 1,
      data: null,
    });
  }
});

const confirmedUser = asyncWrapper(async (req, res) => {
  const {confirm_key}=req.body;
  const user=await User.findOneAndUpdate({confirm_key},{confirmed:true,$unset: { confirm_key}});
  if(user){
    const token = jwt.sign({ UserId: user._id }, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 30,
    });
    return res.status(200).json({
      status: 1,
      data: { token },
    });
  }
  throw new ApiError("Wrong confirmation key")
});

const deleteuser = asyncWrapper(async (req, res) => {
  const UserId = req.UserId;
  const password=req.body.password;
  const user=await User.findOne({_id:UserId})
  if(user.Auth(password)){
    await User.deleteOne({_id:UserId})
    await Task.deleteOne({UserId})
    return res.status(202).json({status:1,data:null})
  }
  throw new ApiError("wrong password",500)
});
module.exports = {
  register,
  login,
  updateUser,
  confirmedUser,
  deleteuser,
};
