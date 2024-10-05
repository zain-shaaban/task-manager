require("dotenv").config();
const User = require("../models/user-model");
const Task = require("../models/task-model");
const asyncWrapper = require("../MiddleWares/asyncWrapper");
const ApiError = require("../utils/ApiError");
const taskValidator = require("../MiddleWares/taskValidator");
const { Op } = require("sequelize");

const getTasks = asyncWrapper(async (req, res) => {
  await deleteCompletedTasks();
  const userWithTasks = await User.findOne({
    where: { userId: req.userId },
    attributes: ["username", "appearance", "email", "auto_delete"],
    include: [
      {
        model: Task,
        as: "tasks",
        attributes: { exclude: ["userId"] },
      },
    ],
  });
  if (userWithTasks && userWithTasks.tasks) {
    userWithTasks.tasks.sort((a, b) => a.last_updated - b.last_updated);
  }
  res.status(200).json({
    status: 1,
    data: userWithTasks,
  });
});

const addtask = asyncWrapper(async (req, res) => {
  const {
    value: { content, date, important, completed },
    error,
  } = taskValidator.addTaskValidate(req.body);
  if (error) {
    throw new ApiError(error.details[0].message);
  }
  const newTask = await Task.create({
    content,
    date,
    last_updated: date,
    userId: req.userId,
    important,
    completed,
  });
  res.status(201).json({
    status: 1,
    data: { id: newTask.taskId },
  });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const {
    value: { ids },
    error,
  } = taskValidator.deleteTasksValidate(req.body);
  if (error) {
    throw new ApiError(error.details[0].message);
  }
  for (let id of ids) {
    await Task.destroy({
      where: {
        taskId: id,
      },
    });
  }
  res.status(202).json({
    status: 1,
    data: null,
  });
});

const updatetask = asyncWrapper(async (req, res) => {
  const {
    value: { id, content, last_updated, important, completed },
    error,
  } = taskValidator.updateTaskValidate({ id: req.params.id, ...req.body });
  if (error) {
    throw new ApiError(error.details[0].message);
  }
  const task = await Task.update(
    { content, last_updated, important, completed },
    {
      where: {
        taskId: id,
      },
    }
  );
  if (task[0])
    return res.status(203).json({
      status: 1,
      data: null,
    });
  throw new ApiError("the task id is not exist", 404);
});

const deleteCompletedTasks = async () => {
  await Task.destroy({
    where: {
      completed: true,
      date: {
        [Op.lt]: Date.now() - 1000 * 60 * 60 * 24 * 7,
      },
    },
  });
};

module.exports = {
  getTasks,
  addtask,
  deleteTask,
  updatetask,
};
