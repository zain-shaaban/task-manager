const express = require("express");
const User = require("../models/user-model");
const Task = require("../models/task-model");
const asyncWrapper = require("../MiddleWares/asyncWrapper");
const { Autherizarion } = require("../MiddleWares/auth");
const OfflineValidator = require("../MiddleWares/offlineValidator");
const ApiError = require("../utils/ApiError");
const { Op } = require("sequelize");
const router = express.Router();

/**
 * @swagger
 * /api/offline:
 *   post:
 *     summary: Apply all changes on tasks when the user is offline
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
 *               - addArray
 *               - updateArray
 *               - deleteArray
 *             properties:
 *               addArray:
 *                 type: array
 *                 description: The task group you want to add
 *                 items:
 *                   type: object
 *                   required:
 *                     - taskId
 *                     - content
 *                     - date
 *                     - important
 *                     - completed
 *                   properties:
 *                     taskId:
 *                       type: number
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
 *                     taskId: 6
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
 *                     - taskId
 *                     - last_updated
 *                   properties:
 *                     taskId:
 *                       type: number
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
 *                     taskId: 5
 *                     content: go to the gym
 *                     last_updated: 123654981651
 *                     important: true
 *                     completed: false
 *               deleteArray:
 *                 type: array
 *                 items:
 *                   type: number
 *                   description: Task IDs you want to delete
 *                 example:
 *                   [10, 25]
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
 *                   data: {idPairs: [ {fakeID: 6,realID: 25}]}
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
    if (error) {
      throw new ApiError(error.details[0].message);
    }
    await Task.destroy({
      where: {
        taskId: {
          [Op.in]: deleteArray,
        },
      },
    });
    for (let task of updateArray) {
      const { taskId, content, last_updated, important, completed } = task;
      await Task.update(
        { content, last_updated, important, completed },
        {
          where: {
            taskId,
          },
        }
      );
    }

    const idPairs = [];
    for (let task of addArray) {
      const { taskId, content, date, important, completed } = task;
      const newTask = await Task.create({
        content,
        date,
        last_updated: date,
        important,
        completed,
        userId: req.userId,
      });
      idPairs.push({ fakeID: taskId, realID: newTask.taskId });
    }
    if (idPairs.length != 0) return res.json({ status: 1, data: { idPairs } });
    res.json({ status: 1, data: null });
  })
);

module.exports = router;
