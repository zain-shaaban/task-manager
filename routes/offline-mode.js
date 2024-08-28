const express = require("express");
const Task = require("../models/task-model");
const asyncWrapper = require("../MiddleWares/asyncWrapper");
const { Autherizarion } = require("../MiddleWares/auth");
const OfflineValidator = require("../MiddleWares/offlineValidator");
const ApiError = require("../utils/ApiError");
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
 *                       type: boolean
 *                       description: The importance of the task, its false by default
 *                     completed:
 *                       type: boolean
 *                       description: Task Status, its false by default
 *                   example:
 *                     id: 66b4fc22026424b198ce0bdd
 *                     content: go to the gym
 *                     date: 123654981651
 *                     important: true
 *                     completed: false
 *               updateArray:
 *                 type: array
 *                 description: The task group you want to change
 *                 items:
 *                   type: object
 *                   required:
 *                     - _id
 *                     - last_updated
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description:
 *                     content:
 *                       type: string
 *                       description: Task content
 *                     last_updated:
 *                       type: number
 *                       description: Last time the task was updated in milliseconds
 *                     important:
 *                       type: boolean
 *                       description: The importance of the task, its false by default
 *                     completed:
 *                       type: boolean
 *                       description: Task Status, its false by default
 *                   example:
 *                     _id: 54b4fc22026424b198ce0bcc
 *                     content: go to the gym
 *                     last_updated: 123654981651
 *                     important: true
 *                     completed: false
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
 *                   description: data is null if the user dosen't add any task
 *             examples:
 *               without add tasks:
 *                 value:
 *                   status: 1
 *                   data: null
 *               with add tasks:
 *                 value:
 *                   status: 1
 *                   data: {idPairs: [ {fakeID: 54b4fc22026424b198ce0bcc,realID: 66b4fc22026424b198ce0bdd}]}
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
    const {
      value: { addArray, updateArray, deleteArray },
      error,
    } = OfflineValidator.validate(req.body);
    if(error){
      throw new ApiError(error.details[0].message)
    }
    for (let taskId of deleteArray) await Task.deleteOne({ _id: taskId });
    for (let task of updateArray) {
      const { _id, content, last_updated, important, completed } = task;
      await Task.findByIdAndUpdate(
        _id,
        { content, last_updated, important, completed },
        { runValidators: true }
      );
    }
    const idPairs = [];
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
      idPairs.push({ fakeID: id, realID: newTask._id });
    }
    if (idPairs.length != 0) return res.json({ status: 1, data: { idPairs } });
    res.json({ status: 1, data: null });
  })
);

module.exports = router;
