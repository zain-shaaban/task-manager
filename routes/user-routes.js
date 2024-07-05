const express = require("express");
const { register, login, updateUser } = require("../controllers/user-controls");
const { Autherizarion } = require("../MiddleWares/auth");

const router = express.Router();

router.route("/api/user/register").post(register);
router.route("/api/user/login").post(login);
router.route("/api/user/updateuser").patch(Autherizarion, updateUser);

module.exports = router;
