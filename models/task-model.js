const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  UserId: {
    type: String,
    required: true,
  },
  important: {
    type: Boolean,
    required: true,
    default: false,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  last_updated: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
