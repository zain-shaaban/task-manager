const express = require("express");
const router = express.Router();
const {
  getTasks,
  addtask,
  deleteTask,
  updatetask
} = require("../controllers/task-controls");
const { Autherizarion } = require("../utils/auth");

router.route("/api/tasks").post(Autherizarion, getTasks);
router.route("/api/addtask").post(Autherizarion, addtask);
router.route("/api/deletetask/:id").delete(Autherizarion, deleteTask);
router.route("/api/updatetask/:id").patch(Autherizarion, updatetask);

module.exports = router;
