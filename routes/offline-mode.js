const express = require("express");
const Task = require("../models/task-model");
const asyncWrapper = require("../MiddleWares/asyncWrapper");
const { Autherizarion } = require("../MiddleWares/auth");

const router = express.Router();

/**
 * @swagger
 * /api/offline:
 *   post:
 *     summary: Apply all changes on tasks when the user is offline
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - addArray
 *               - updateArray
 *               - deleteArray
 *             properties:
 *               token:
 *                 type: string
 *                 description: Access token to authenticate the user
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NmIzZTFjMDQ5M2E0ZTkxNmFmYzdlZjQiLCJpYXQiOjE3MjM0ODY5NjUsImV4cCI6NDMxNTQ4Njk2NX0.-HhVZgYJZmZZSfBfm9RlKp1W_X58wOUm02cT_lQeN-I
 *               addArray:
 *                 type: array
 *                 description: The task group you want to add
 *                 items:
 *                   type: object
 *                   required:
 *                     - content
 *                     - date
 *                     - important
 *                     - completed
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: temporary id
 *                     content:
 *                       type: string
 *                       description: Task content
 *                     date:
 *                       type: number
 *                       description: Task creation date in milliseconds
 *                     important:
 *                       type: number
 *                       description: The importance of the task, its 0 by default
 *                     completed:
 *                       type: number
 *                       description: Task Status, its 0 by default
 *                   example:
 *                     id: 66b4fc22026424b198ce0bdd
 *                     content: go to the gym
 *                     date: 123654981651
 *                     important: 1
 *                     completed: 0
 *               updateArray:
 *                 type: array
 *                 description: The task group you want to change
 *                 items:
 *                   type: object
 *                   required:
 *                     - content
 *                     - last_updated
 *                     - important
 *                     - completed
 *                   properties:
 *                     content:
 *                       type: string
 *                       description: Task content
 *                     last_updated:
 *                       type: number
 *                       description: Last time the task was updated in milliseconds
 *                     important:
 *                       type: number
 *                       description: The importance of the task, its 0 by default
 *                     completed:
 *                       type: number
 *                       description: Task Status, its 0 by default
 *                   example:
 *                     id: 54b4fc22026424b198ce0bcc
 *                     content: go to the gym
 *                     last_updated: 123654981651
 *                     important: 1
 *                     completed: 0
 *               deleteArray:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Task IDs you want to delete
 *                 example:
 *                   ["54b4fc22026424b198ce0bcc" , "66b4fc22026424b198ce0bdd"]
 *     responses:
 *       200:
 *         description: All the operations completed successfully
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

router.route("/api/offline").post(
  Autherizarion,
  asyncWrapper(async (req, res) => {
    const { deleteArray, updateArray, addArray } = req.body;
    for (let taskId of deleteArray) await Task.deleteOne({ _id: taskId });
    for (let task of updateArray) {
      const { id, content, last_updated, important, completed } = task;
      await Task.findByIdAndUpdate(
        id,
        { content, last_updated, important, completed },
        { runValidators: true }
      );
    }
    const arr = [];
    for (let task of addArray) {
      const { id, content, date, important, completed } = task;
      const newTask = await Task.create({
        content,
        date,
        last_updated: date,
        UserId: req.UserId,
        important,
        completed,
      });
      arr.push([id, newTask._id]);
    }
    res.json({status:1,data:null});
  })
);

module.exports = router;
