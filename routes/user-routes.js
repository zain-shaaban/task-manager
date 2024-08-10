const express = require("express");
const { register, login, updateUser ,confirmedUser,deleteuser} = require("../controllers/user-controls");
const { Autherizarion } = require("../MiddleWares/auth");

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
 *     summary: Register to make account on the website
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
 *                   description: Status of the operation ,always its 1
 *                 data:
 *                   type: null
 *                   description: No data exist
 *               example:
 *                 status: 1
 *                 data: null
 *       500:
 *         description: The email is already used by another account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Status of the operation ,always its 0
 *                 message:
 *                   type: string
 *                   description: explain what is the error
 *               example:
 *                 status: 0
 *                 message: This Email Is Already Exist
 */

router.route("/api/user/register").post(register);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login on the website
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
 *         description: The login completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Status of the operation ,always its 1
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: Access token should be saved
 *               example:
 *                 status: 1
 *                 data: {"token":zelkdas;lksadas54d5a4sd54as1d21a2s1d21asdlklaksld}
 *       404:
 *         description: The email is not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Status of the operation ,always its 0
 *                 message:
 *                   type: string
 *                   description: explain what is the error
 *               example:
 *                 status: 0
 *                 message: This Email Is Not Exist
 *       500:
 *         description: The password is wrong or the email is not confirmed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Status of the operation ,always its 0
 *                 message:
 *                   type: string
 *                   description: explain what is the error
 *               example:
 *                 status: 0
 *                 message: This Password Is Wrong
 */

router.route("/api/user/login").post(login);


/**
 * @swagger
 * /api/user/confirm:
 *   patch:
 *     summary: Confirm the email
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - token
 *             properties:
 *               token: 
 *                 type: string
 *                 description: authentication token exists on your Gmail after register
 *             example:
 *               token: sdlklaksdlklas55d1as5d15a1sd5
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
 *                   description: Status of the operation ,always its 1
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: Access token should be saved
 *               example:
 *                 status: 1
 *                 data: {"token":zelkdas;lksadas54d5a4sd54as1d21a2s1d21asdlklaksld}
 *       500:
 *         description: The authentication token not valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Status of the operation ,always its 0
 *                 message:
 *                   type: string
 *                   description: explain what is the error
 *               example:
 *                 status: 0
 *                 message: the token is not valid
 */
router.route("/api/user/confirm").patch(confirmedUser);

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register to make account on the website
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
 *                   description: Status of the operation ,always its 1
 *                 data:
 *                   type: null
 *                   description: No data exist
 *               example:
 *                 status: 1
 *                 data: null
 *       500:
 *         description: The email is already used by another account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Status of the operation ,always its 0
 *                 message:
 *                   type: string
 *                   description: explain what is the error
 *               example:
 *                 status: 0
 *                 message: This Email Is Already Exist
 */

router.route("/api/user/register").post(register);

/**
 * @swagger
 * /api/user/update:
 *   patch:
 *     summary: Update user information
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: Access token to have the ability to make changes
 *               email:
 *                 type: string
 *                 description: Email of the account
 *               password:
 *                 type: string
 *                 description: Password of the account
 *               apperance:
 *                 type: number
 *                 description: State of apperance, its 1 by default
 *               auto_delete:
 *                 type: number
 *                 description: used to delete completed task directly, its 0 by default
 *             example:
 *               token: lkdlkalsdklsd45a4sd54a5s4ddsd
 *               email: test@gmail.com
 *               password: test123
 *               apperance: 3
 *               auto-delete: 1
 *     responses:
 *       200:
 *         description: The user information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Status of the operation ,always its 1
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: Access token just if password updated else data is null
 *               example:
 *                 status: 1
 *                 data: {"token":zelkdas;lksadas54d5a4sd54as1d21a2s1d21asdlklaksld}
 *       500:
 *         description: The token is not valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Status of the operation ,always its 0
 *                 message:
 *                   type: string
 *                   description: explain what is the error
 *               example:
 *                 status: 0
 *                 message: The token is not valid
 */
router.route("/api/user/update").patch(Autherizarion, updateUser);

/**
 * @swagger
 * /api/user/delete:
 *   delete:
 *     summary: Delete the account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *                 description: Access token to have the ability to delete account
 *               password:
 *                 type: string
 *                 description: Password of the account
 *             example:
 *               token: lkdlkalsdklsd45a4sd54a5s4ddsd
 *               password: test123
 *     responses:
 *       200:
 *         description: The account has deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Status of the operation ,always its 1
 *                 data:
 *                   type: null
 *                   description: No data returned
 *               example:
 *                 status: 1
 *                 data: null
 *       500:
 *         description: The token is not valid or the password is wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Status of the operation ,always its 0
 *                 message:
 *                   type: string
 *                   description: explain what is the error
 *               example:
 *                 status: 0
 *                 message: The password is wrong
 */
router.route("/api/user/delete").delete(Autherizarion, deleteuser);

module.exports = router;
