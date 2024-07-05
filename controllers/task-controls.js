require("dotenv").config();
const Task = require("../models/task-model");
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ UserId: req.UserId }).sort({ date: "asc" });
    const user = await User.findById(req.UserId);
    res.status(200).json({
      status: 1,
      data: {
        tasks,
        name: user.name,
        appearance: user.appearance,
        email: user.email,
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
    const { content, date } = req.body;

    if (!content) {
      return res.status(500).json({
        status: 0,
        data: { content: "content is required!" },
      });
    }
    const task = await Task.create({ content, date, UserId: req.UserId });
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

const updatetask = async (req, res) => {
  try {
    const id = req.params.id;
    const { content, date, important, completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      { content, date, important, completed },
      { new: true, runValidators: true }
    );
    if (task)
      return res.status(203).json({
        status: 1,
        data: { task },
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

module.exports = {
  getTasks,
  addtask,
  deleteTask,
  updatetask,
};
