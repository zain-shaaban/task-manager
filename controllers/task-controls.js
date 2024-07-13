require("dotenv").config();
const Task = require("../models/task-model");
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../MiddleWares/asyncWrapper");
const CustomError = require("../utils/customeError");

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({ UserId: req.UserId },{__v:false}).sort({ date: "asc" });
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
});

const addtask = asyncWrapper(async (req, res) => {
  const { content, date, important, completed } = req.body;
  if (!content) throw new CustomError("Content Is Required", 500);
  const newTask=await Task.create({
    content,
    date,
    UserId: req.UserId,
    important,
    completed,
  });
  res.status(201).json({
    status: 1,
    data: {id:newTask._id},
  });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const task = await Task.findByIdAndDelete(id);
  if (task)
    return res.status(203).json({
      status: 1,
      data: null,
    });
  throw new CustomError("This TaskId Is Not Exist", 404);
});

const updatetask = asyncWrapper(async (req, res) => {
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
      data: null,
    });
  throw new CustomError("This TaskId Is Not Exist", 404);
});

module.exports = {
  getTasks,
  addtask,
  deleteTask,
  updatetask,
};