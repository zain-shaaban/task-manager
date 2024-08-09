const express = require("express");
const { register, login, updateUser ,confirmedUser,deleteuser} = require("../controllers/user-controls");
const { Autherizarion } = require("../MiddleWares/auth");

const router = express.Router();

router.route("/api/user/register").post(register);
router.route("/api/user/login").post(login);
router.route("/api/user/confirm").patch(confirmedUser);
router.route("/api/user/update").patch(Autherizarion, updateUser);
router.route("/api/user/delete").delete(Autherizarion, deleteuser);

module.exports = router;
