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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
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
},{toJSON:{
  transform(doc,ret){
    delete ret.__v;
    delete ret.user;
  }
}});

module.exports = mongoose.model("Task", taskSchema);
