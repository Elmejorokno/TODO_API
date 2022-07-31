const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema(
  {
    taskName: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 30,
      required: [true, `Must provide a task name.`],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    listId: {
      type: mongoose.Types.ObjectId,
      ref: "lists",
      required: [true, "Must provide a list id."],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: [true, "Must provide an user id."],
    },
  },
  { timestamps: true }
);

const Task = model("tasks", taskSchema);
module.exports = Task;
