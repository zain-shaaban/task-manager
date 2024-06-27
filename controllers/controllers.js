require("dotenv").config();
const Task = require("../models/task-model");
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ UserId: req.UserId }).sort({ date: "asc" });
    const user=await User.findById(req.UserId);
    res.status(200).json({
      status: 1,
      data: {
        tasks,
        name:user.name
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

const addtask = async (req, res) => {
  try {
    const { content, date} = req.body;

    if (!content) {
      res.status(500).json({
        status: 0,
        data: { content: "content is required!" },
      });
    }
    const task = await Task.create({ content, date, UserId:req.UserId });
    res.status(201).json({
      status: 1,
      data: { task },
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    if (task)
      return res.status(203).json({
        status: 1,
        data: null,
      });
    res.status(203).json({
      status: 0,
      message: "This Id Is Not Exist...",
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

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

module.exports = {
  getTasks,
  addtask,
  deleteTask,
  register,
  login,
};

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NjdkNzQzZGEyYWU4OTY0YjgwYmY5ZTYiLCJpYXQiOjE3MTk0OTk2MDAsImV4cCI6NDMxMTQ5OTYwMH0.XFJ3GObKOz4q3KO-qDNHyIlzaLAFxGgS1luh9yYriIA
