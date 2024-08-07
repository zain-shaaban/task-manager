const express = require("express");
const router = express.Router();
const {
  getTasks,
  addtask,
  deleteTask,
  updatetask,
  deleteCompletedTasks
} = require("../controllers/task-controls");
const { Autherizarion } = require("../MiddleWares/auth");

router.route("/api/tasks").post(Autherizarion, getTasks);
router.route("/api/addtask").post(Autherizarion, addtask);
router.route("/api/deletetask/:id").delete(Autherizarion, deleteTask);
router.route("/api/updatetask/:id").patch(Autherizarion, updatetask);
router.route("/api/tasks/deletecomplete").delete(deleteCompletedTasks);

module.exports = router;
