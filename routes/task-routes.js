const express = require("express");
const router = express.Router();
const{getTasks,addtask,deleteTask}=require("../controllers/task-controls")

router.route("/api/tasks").get(getTasks);
router.route("/api/addtask").post(addtask);
router.route("/api/deletetask/:id").delete(deleteTask);

module.exports = router;
