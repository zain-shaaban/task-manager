const express = require("express");
const router = express.Router();
const {
  getTasks,
  addtask,
  deleteTask,
  updatetask,
} = require("../controllers/task-controls");
const { Autherizarion } = require("../MiddleWares/auth");

/**
 * @swagger 
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - content
 *         - date
 *         - important
 *         - completed
 *         - last_updated
 *       properties:
 *         taskId:
 *           type: number
 *           description: The new task auto-generated id
 *         content:
 *           type: string
 *           description: Task content
 *         date:
 *           type: number
 *           description: Task creation date in milliseconds
 *         important:
 *           type: boolean
 *           description: The importance of the task, its false by default
 *         completed:
 *           type: boolean
 *           description: Task Status, its false by default
 *         last_updated:
 *           type: number
 *           description: Last time the task was updated in milliseconds
 *       example:
 *         taskId: 20
 *         content: go to the gym
 *         date: 123654981651
 *         important: false
 *         completed: false
 *         last_updated: 12365986784
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - username
 *       properties:
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *         name:
 *           type: string
 *           description: User name
 *       example:
 *         email: test@gmail.com
 *         password: test123
 *         username: test test
 * */

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: The task managing endpoints
 * 
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Returns all user tasks
 *     tags: [Task]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NmIzZTFjMDQ5M2E0ZTkxNmFmYzdlZjQiLCJpYXQiOjE3MjM0ODY5NjUsImV4cCI6NDMxNTQ4Njk2NX0.-HhVZgYJZmZZSfBfm9RlKp1W_X58wOUm02cT_lQeN-I
 *     responses:
 *       200:
 *         description: Data returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status ,always its 1
 *                   example: 1
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       description: User name
 *                       example: test test
 *                     appearance:
 *                       type: number
 *                       description:  Appearance status
 *                       example: 3
 *                     email:
 *                       type: string
 *                       description: User email
 *                       example: test@gmail.com
 *                     auto_delete:
 *                       type: boolean
 *                       description: Option to delete completed tasks directly
 *                       example: false
 *                     tasks:
 *                       type: array
 *                       items:
 *                         $ref: "#/components/schemas/Task"
 *       500:
 *         description: The token is invalid any more
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
router.route("/api/tasks").get(Autherizarion, getTasks);


/**
 * @swagger
 * /api/tasks/add:
 *   post:
 *     summary: Add new task
 *     tags: [Task]
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
 *               - content
 *               - date
 *               - important
 *               - completed
 *             properties:
 *               content:
 *                 type: string
 *                 description: Task content
 *               date:
 *                 type: number
 *                 description: Task creation date in milliseconds
 *               important:
 *                 type: boolean
 *                 description: The importance of the task, its false by default
 *               completed:
 *                 type: boolean
 *                 description: Task Status, its false by default
 *             example:
 *               content: go to the gym
 *               date: 123654981651
 *               important: true
 *               completed: false
 *     responses:
 *       201:
 *         description: The new task has added successfully
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
 *                     taskId:
 *                       type: number
 *                       description: The new task auto-generated id
 *               example:
 *                 status: 1
 *                 data: {"taskId": 20}
 *       500:
 *         description: The token is invalid any more
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
router.route("/api/tasks/add").post(Autherizarion, addtask);

/**
 * @swagger
 * /api/tasks/delete:
 *   delete:
 *     summary: Delete one task or more
 *     tags: [Task]
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
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: Matrix of each task ID that you want to delete, one or more
 *             example:
 *               ids: [10 , 20 ,22]
 *     responses:
 *       202:
 *         description: The tasks have deleted successfully
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
 *                   description: Always data is null
 *               example:
 *                 status: 1
 *                 data: null
 *       500:
 *         description: The token is invalid any more
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
router.route("/api/tasks/delete").delete(Autherizarion, deleteTask);

/**
 * @swagger
 * /api/tasks/update/{id}:
 *   patch:
 *     summary: Update one task information
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The task id
 *         example: 22
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
 *               - last_updated
 *             properties:
 *               content:
 *                 type: string
 *                 description: Task content
 *               last_updated:
 *                 type: number
 *                 description: Last time the task was updated in milliseconds
 *               important:
 *                 type: boolean
 *                 description: The importance of the task, its false by default
 *               completed:
 *                 type: boolean
 *                 description: Task Status, its false by default
 *             example:
 *               content: go to the gym
 *               last_updated: 123654981651
 *               important: true
 *               completed: false
 *     responses:
 *       203:
 *         description:  The task has updated successfully
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
 *                   description: Data always should be null
 *               example:
 *                 status: 1
 *                 data: null
 *       404:
 *         description: The task id is not exist
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
 *                 message: the task id is not exist
 *       500:
 *         description: The token is invalid any more
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
router.route("/api/tasks/update/:id").patch(Autherizarion, updatetask);

module.exports = router;