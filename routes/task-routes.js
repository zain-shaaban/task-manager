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
 *         content:
 *           type: string
 *           description: Content of the task
 *         date:
 *           type: number
 *           description: Date of create the task by miliSecond
 *         important:
 *           type: number
 *           description: Important of the task, its 0 by default
 *         completed:
 *           type: number
 *           description: State of the task, its 0 by default
 *         last_updated:
 *           type: number
 *           description: Last time the task updated by miliSeconds 
 *       example:
 *         content: go to the gym
 *         date: 123654981651
 *         important: 1
 *         completed: 0
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
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *         name:
 *           type: string
 *           description: Name of the user
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
 *     summary: Return all tasks of the user
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
 *                 description: Access token to verify the user
 *             example:
 *               token: sldklk5454ds5454ds54545sd4sdsd
 *     responses:
 *       200:
 *         description: Returned the data successfully
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
 *                     tasks:
 *                       type: array
 *                       items:
 *                         $ref: "#/components/schemas/Task"
 *                     name:
 *                       type: string
 *                       description: Name of the user
 *                       example: test test
 *                     apperance:
 *                       type: number
 *                       description:  State of apperance
 *                       example: 3
 *                     email:
 *                       type: string
 *                       description: Email of the user
 *                       example: test@gmail.com
 *                     auto_delete:
 *                       type: number
 *                       description: used to delete completed task directly
 *                       example: 1
 *       500:
 *         description: The token is not valid any more
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
 *                 description: Access token to verify the user
 *               content:
 *                 type: string
 *                 description: Content of the task
 *               date:
 *                 type: number
 *                 description: Date of create the task by miliSecond
 *               important:
 *                 type: number
 *                 description: Important of the task, its 0 by default
 *               completed:
 *                 type: number
 *                 description: State of the task, its 0 by default
 *             example:
 *               token: sd545ds4d545s4d5s4d54ds54
 *               content: go to the gym
 *               date: 123654981651
 *               important: 1
 *               completed: 0
 *     responses:
 *       201:
 *         description: The new task added successfully
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
 *                     id:
 *                       type: number
 *                       description: The new task auti-generated id
 *               example:
 *                 status: 1
 *                 data: {"id": 586294756215}
 *       500:
 *         description: The token is not valid any more
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
 *                 description: Access token to verify the user
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Put all the tasks ids you want to delete in this array, Could be one or more
 *             example:
 *               token: sd545ds4d545s4d5s4d54ds54
 *               ids: ["12365496262" , "5456512321"]
 *     responses:
 *       202:
 *         description: The tasks deleted successfully
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
 *                   description: Always data is null
 *               example:
 *                 status: 1
 *                 data: null
 *       404:
 *         description: One or more of this tasks id is not found
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
 *                   description: Returned this Task Id Is Not Found {id}
 *               example:
 *                 status: 0
 *                 message: This Task Id Is Not Found 51321651221
 *       500:
 *         description: The token is not valid any more
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
 *         description: The book id
 *         example: 6562365965648
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
 *                 description: Access token to verify the user
 *               content:
 *                 type: string
 *                 description: Content of the task
 *               last_updated:
 *                 type: number
 *                 description: Date of update the task by miliSecond
 *               important:
 *                 type: number
 *                 description: Important of the task, its 0 by default
 *               completed:
 *                 type: number
 *                 description: State of the task, its 0 by default
 *             example:
 *               token: sd545ds4d545s4d5s4d54ds54
 *               content: go to the gym
 *               last_updated: 123654981651
 *               important: 1
 *               completed: 0
 *     responses:
 *       203:
 *         description: The task updated successfully
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
 *                   description: Data always should be null
 *               example:
 *                 status: 1
 *                 data: null
 *       404:
 *         description: One or more of this tasks id is not found
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
 *                   description: this task id is not exist
 *               example:
 *                 status: 0
 *                 message: This TaskId Is Not Exist
 *       500:
 *         description: The token is not valid any more
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
router.route("/api/tasks/update/:id").patch(Autherizarion, updatetask);
router.route("/api/tasks/deletecomplete").delete(deleteCompletedTasks);

module.exports = router;
