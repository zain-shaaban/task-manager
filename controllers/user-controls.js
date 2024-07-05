require("dotenv").config();
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    const token = jwt.sign({ UserId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 30,
    });
    res.status(200).json({
      status: 1,
      data: { token },
    });
  } catch (error) {
    if (error.code == 11000)
      return res.status(500).json({
        status: 0,
        message: "This Email Is Already Exist",
      });
    res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        status: 0,
        message: "This Email Is Not Exist",
      });
    if (!user.Auth(password))
      return res.status(404).json({
        status: 0,
        message: "The Password Is Wrong",
      });
    const token = jwt.sign({ UserId: user._id }, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 30,
    });
    res.status(200).json({
      status: 1,
      data: { token },
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, password,appearance } = req.body;
    const userUpdated = await User.findOneAndUpdate(
      {_id:req.UserId},
      { name, email, password,appearance },
      { new: true, runValidators: true }
    );
    if (!userUpdated) {
      return res.status(404).json({
        status: 0,
        message: "this User Is Not Exist",
      });
    }
    res.status(200).json({
      status: 1,
      data: { user: userUpdated },
    });
  } catch (error) {
    if (error.code == 11000)
      return res.status(500).json({
        status: 0,
        message: "This Email Is Already Exist",
      });
    res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  updateUser,
};
