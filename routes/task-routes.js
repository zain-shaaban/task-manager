const express = require("express");
const router = express.Router();
const{getTasks,addtask}=require("../controllers/task-controls")

router.route("/api/tasks").get(getTasks);
router.route("/api/addtask").post(addtask);

module.exports = router;
