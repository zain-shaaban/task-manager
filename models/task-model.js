const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  UserId:{
    type:String,
    required:true
  },
  important:{
    type:Number,
    required:true,
    default:0
  },
  completed:{
    type:Number,
    required:true,
    default:0
  }
});

module.exports = mongoose.model("Task", taskSchema);
