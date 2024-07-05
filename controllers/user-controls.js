require("dotenv").config();
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../MiddleWares/asyncWrapper");
const CustomError = require("../utils/customeError");

const register = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await User.create({ name, email, password });
  const token = jwt.sign({ UserId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: 1000 * 60 * 60 * 24 * 30,
  });
  res.status(200).json({
    status: 1,
    data: { token },
  });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new CustomError("This Email Is Not Exist", 404);
  if (!user.Auth(password))
    throw new CustomError("This Password Is Wrong", 404);
  const token = jwt.sign({ UserId: user._id }, process.env.JWT_SECRET, {
    expiresIn: 1000 * 60 * 60 * 24 * 30,
  });
  res.status(200).json({
    status: 1,
    data: { token },
  });
});

const updateUser = asyncWrapper(async (req, res) => {
  const { name, email, password, appearance } = req.body;
  await User.updateOne(
    { _id: req.UserId },
    { name, email, password, appearance },
    { new: true, runValidators: true }
  );
  res.status(203).json({
    status: 1,
    data: null,
  });
});

module.exports = {
  register,
  login,
  updateUser,
};
