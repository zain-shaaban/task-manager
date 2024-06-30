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
  UserId:{
    type:String,
    required:true
  },
  imortant:{
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
