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
 *         _id:
 *           type: string
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
 *         _id: 66ba00d5abd21e68c7828071
 *         content: go to the gym
 *         date: 123654981651
 *         important: true
 *         completed: false
 *         last_updated: 12365986784
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
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
 *         name: test test
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
 *   post:
 *     summary: Returns all user tasks
 *     tags: [Task]
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
 *                 description: Access token to authenticate the user
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NmIzZTFjMDQ5M2E0ZTkxNmFmYzdlZjQiLCJpYXQiOjE3MjM0ODY5NjUsImV4cCI6NDMxNTQ4Njk2NX0.-HhVZgYJZmZZSfBfm9RlKp1W_X58wOUm02cT_lQeN-I
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
 *                     tasks:
 *                       type: array
 *                       items:
 *                         $ref: "#/components/schemas/Task"
 *                     name:
 *                       type: string
 *                       description: User name
 *                       example: test test
 *                     apperance:
 *                       type: number
 *                       description:  Apperance status
 *                       example: 3
 *                     email:
 *                       type: string
 *                       description: User email
 *                       example: test@gmail.com
 *                     auto_delete:
 *                       type: number
 *                       description: Option to delete completed tasks directly
 *                       example: 1
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
router.route("/api/tasks").post(Autherizarion, getTasks);


/**
 * @swagger
 * /api/tasks/add:
 *   post:
 *     summary: Add new task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - content
 *               - date
 *               - important
 *               - completed
 *             properties:
 *               token:
 *                 type: string
 *                 description: Access token to authenticate the user
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
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NmIzZTFjMDQ5M2E0ZTkxNmFmYzdlZjQiLCJpYXQiOjE3MjM0ODY5NjUsImV4cCI6NDMxNTQ4Njk2NX0.-HhVZgYJZmZZSfBfm9RlKp1W_X58wOUm02cT_lQeN-I
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
 *                     id:
 *                       type: string
 *                       description: The new task auto-generated id
 *               example:
 *                 status: 1
 *                 data: {"id": 66ba00d5abd21e68c7828071}
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - ids
 *             properties:
 *               token:
 *                 type: string
 *                 description: Access token to authenticate the user
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Matrix of each task ID that you want to delete, one or more
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NmIzZTFjMDQ5M2E0ZTkxNmFmYzdlZjQiLCJpYXQiOjE3MjM0ODY5NjUsImV4cCI6NDMxNTQ4Njk2NX0.-HhVZgYJZmZZSfBfm9RlKp1W_X58wOUm02cT_lQeN-I
 *               ids: ["66ba00d5abd21e68c7822895" , "66ba00d5abd21e68c7825431"]
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
 *       404:
 *         description: One or more of these tasks id is not found
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
 *                   description: Returned this task id is not exist {id}
 *               example:
 *                 status: 0
 *                 message: this task id is not exist 66ba00d5abd21e68c7825431
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
 *           type: string
 *         required: true
 *         description: The task id
 *         example: 66ba00d5abd21e68c7822895
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - last_updated
 *             properties:
 *               token:
 *                 type: string
 *                 description: Access token to authenticate the user
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
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NmIzZTFjMDQ5M2E0ZTkxNmFmYzdlZjQiLCJpYXQiOjE3MjM0ODY5NjUsImV4cCI6NDMxNTQ4Njk2NX0.-HhVZgYJZmZZSfBfm9RlKp1W_X58wOUm02cT_lQeN-I
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
router.route("/api/tasks/deletecomplete").delete(deleteCompletedTasks);

module.exports = router;
