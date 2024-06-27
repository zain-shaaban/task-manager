const express = require("express");
const router = express.Router();
const{getTasks,addtask,deleteTask}=require("../controllers/controllers")
const {Autherizarion}=require("../utils/auth")

router.route("/api/tasks").post(Autherizarion,getTasks);
router.route("/api/addtask").post(Autherizarion,addtask);
router.route("/api/deletetask/:id").delete(Autherizarion,deleteTask);

module.exports = router;
