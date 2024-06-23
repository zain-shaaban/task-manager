const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default:new Date().toTimeString()
  },
});

module.exports = mongoose.model("Task", taskSchema);
