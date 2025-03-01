import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: String,
  message: String,
  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const TaskModel = mongoose.model("Task", taskSchema);

export default TaskModel;
