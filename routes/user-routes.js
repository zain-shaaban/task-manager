const express = require("express");
const { loginLimiter, confirmLimiter } = require("../MiddleWares/rateLimiter");
const { Autherizarion } = require("../MiddleWares/auth");
const {
  register,
  login,
  updateUser,
  confirmedUser,
  deleteuser,
  resendOTP,
} = require("../controllers/user-controls");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user managing endpoints
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Create an account on the website
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       200:
 *         description: The account has created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status ,always its 1
 *                 data:
 *                   type: object
 *                   properties:
 *                     verifyUserToken:
 *                       type: string
 *                       description: Verify user token to continue the confirmation process ,should be saved
 *               example:
 *                 status: 1
 *                 data: {"verifyUserToken":eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NmIzZTFjMDQ5M2E0ZTkxNmFmYzdlZjQiLCJpYXQiOjE3MjM0ODY5NjUsImV4cCI6NDMxNTQ4Njk2NX0.-HhVZgYJZmZZSfBfm9RlKp1W_X58wOUm02cT_lQeN-I}
 *       500:
 *         description: The email is already used by another account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status ,always its 0
 *                 message:
 *                   type: string
 *                   description: Explanation of the error
 *               example:
 *                 status: 0
 *                 message: the email is already used
 */

router.route("/api/user/register").post(register);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Log in to the website ,
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the account
 *               password:
 *                 type: string
 *                 description: Password of the account
 *             example:
 *               email: test@gmail.com
 *               password: test123
 *     responses:
 *       200:
 *         description: The login has completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status ,always its 1
 *                 data:
 *                   type: object
 *                   properties:
 *                     authToken:
 *                       type: string
 *                       description: Access token ,should be saved
 *               example:
 *                 status: 1
 *                 data: {"authToken":eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NmIzZTFjMDQ5M2E0ZTkxNmFmYzdlZjQiLCJpYXQiOjE3MjM0ODY5NjUsImV4cCI6NDMxNTQ4Njk2NX0.-HhVZgYJZmZZSfBfm9RlKp1W_X58wOUm02cT_lQeN-I}
 *       500:
 *         description: The password or email is wrong or the email is not confirmed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status ,always its 0
 *                 message:
 *                   type: string
 *                   description: Explanation of the error
 *                 data:
 *                   type: object
 *                   properties:
 *                     verifyUserToken:
 *                       type: string
 *                       description: Verify user token to continue the confirmation process ,should be saved
 *             examples:
 *               Wrong email or password:
 *                 value:
 *                   status: 0
 *                   message: email or password is incorrect
 *               Unconfirmed email:
 *                 value:
 *                   status: 0
 *                   message: the email is unconfirmed
 *                   data: {"verifyUserToken":eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NmIzZTFjMDQ5M2E0ZTkxNmFmYzdlZjQiLCJpYXQiOjE3MjM0ODY5NjUsImV4cCI6NDMxNTQ4Njk2NX0.-HhVZgYJZmZZSfBfm9RlKp1W_X58wOUm02cT_lQeN-I}
 */

router.route("/api/user/login").post(login);

/**
 * @swagger
 * /api/user/confirm:
 *   patch:
 *     summary: Confirm the email
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: verifyUserToken
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NmIzZTFjMDQ5M2E0ZTkxNmFmYzdlZjQiLCJpYXQiOjE3MjM0ODY5NjUsImV4cCI6NDMxNTQ4Njk2NX0.-HhVZgYJZmZZSfBfm9RlKp1W_X58wOUm02cT_lQeN-I
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - confirm_key
 *             properties:
 *               confirm_key:
 *                 type: number
 *                 description: Four digit number in your email
 *             example:
 *               confirm_key: 123456
 *     responses:
 *       200:
 *         description: The account has confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status ,always its 1
 *                 data:
 *                   type: object
 *                   properties:
 *                     authToken:
 *                       type: string
 *                       description: Access token ,should be saved
 *               example:
 *                 status: 1
 *                 data: {"authToken": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NmIzZTFjMDQ5M2E0ZTkxNmFmYzdlZjQiLCJpYXQiOjE3MjM0ODY5NjUsImV4cCI6NDMxNTQ4Njk2NX0.-HhVZgYJZmZZSfBfm9RlKp1W_X58wOUm02cT_lQeN-I}
 *       500:
 *         description: The confirmation key is wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status ,always its 0
 *                 message:
 *                   type: string
 *                   description: Explanation of the error
 *               example:
 *                 status: 0
 *                 message: Wrong confirmation key
 */

router.route("/api/user/confirm").patch(confirmedUser);

/**
 * @swagger
 * /api/user/update:
 *   patch:
 *     summary: Update user information
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NmIzZTFjMDQ5M2E0ZTkxNmFmYzdlZjQiLCJpYXQiOjE3MjM0ODY5NjUsImV4cCI6NDMxNTQ4Njk2NX0.-HhVZgYJZmZZSfBfm9RlKp1W_X58wOUm02cT_lQeN-I
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the account
 *               password:
 *                 type: string
 *                 description: Password of the account
 *               apperance:
 *                 type: number
 *                 description: Apperance status, its 1 by default
 *               auto_delete:
 *                 type: boolean
 *                 description: Option to delete completed tasks directly, its false by default
 *             example:
 *               email: test@gmail.com
 *               password: test123
 *               apperance: 3
 *               auto-delete: 1
 *     responses:
 *       200:
 *         description: The user information has updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status ,always its 1
 *                 data:
 *                   type: object
 *                   properties:
 *                     authToken:
 *                       type: string
 *                       description: Access token just if password has updated, else data is null
 *             examples:
 *               Password has updated:
 *                 value:
 *                   status: 1
 *                   data: {"authToken":eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NmIzZTFjMDQ5M2E0ZTkxNmFmYzdlZjQiLCJpYXQiOjE3MjM0ODY5NjUsImV4cCI6NDMxNTQ4Njk2NX0.-HhVZgYJZmZZSfBfm9RlKp1W_X58wOUm02cT_lQeN-I}
 *               Password has't updated:
 *                 value:
 *                   status: 1
 *                   data: null
 *       500:
 *         description: The token is invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status ,always its 0
 *                 message:
 *                   type: string
 *                   description: Explanation of the error
 *               example:
 *                 status: 0
 *                 message: invalid token
 */
router.route("/api/user/update").patch(Autherizarion, updateUser);

/**
 * @swagger
 * /api/user/delete:
 *   delete:
 *     summary: Delete the account
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NmIzZTFjMDQ5M2E0ZTkxNmFmYzdlZjQiLCJpYXQiOjE3MjM0ODY5NjUsImV4cCI6NDMxNTQ4Njk2NX0.-HhVZgYJZmZZSfBfm9RlKp1W_X58wOUm02cT_lQeN-I
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 description: Password of the account
 *             example:
 *               password: test123
 *     responses:
 *       202:
 *         description: The account has deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status ,always its 1
 *                 data:
 *                   type: null
 *                   description: No data returned
 *               example:
 *                 status: 1
 *                 data: null
 *       500:
 *         description: The token is invalid or the password is wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status ,always its 0
 *                 message:
 *                   type: string
 *                   description: Explanation of the error
 *             examples:
 *               The password is wrong:
 *                 value:
 *                   status: 0
 *                   message: wrong password
 *               The token is wrong:
 *                 value:
 *                   status: 0
 *                   message: invalid token
 */
router.route("/api/user/delete").delete(Autherizarion, deleteuser);

/**
 * @swagger
 * /api/user/resendotp:
 *   get:
 *     summary: Resend confirmation key to user email
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: verifyUserToken
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NmIzZTFjMDQ5M2E0ZTkxNmFmYzdlZjQiLCJpYXQiOjE3MjM0ODY5NjUsImV4cCI6NDMxNTQ4Njk2NX0.-HhVZgYJZmZZSfBfm9RlKp1W_X58wOUm02cT_lQeN-I
 *         required: true
 *     responses:
 *       200:
 *         description: The confirmation key has sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status ,always its 1
 *                 data:
 *                   type: null
 *               example:
 *                 status: 1
 *                 data: null
 *       500:
 *         description: The token is not valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status ,always its 0
 *                 message:
 *                   type: string
 *                   description: Explanation of the error
 *               example:
 *                 status: 0
 *                 message: invalid token
 */

router.route("/api/user/resendotp").get(resendOTP);

module.exports = router;
