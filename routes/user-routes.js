const express = require("express");
const { register, login } = require("../controllers/controllers");

const router = express.Router();

router.route("/api/user/register").post(register);
router.route("/api/user/login").post(login);

module.exports = router;
