const express = require("express");
const {
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const {
  createTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
} = require("../validators/task.validator");

const router = express.Router();

router.post("/", createTaskValidator, createTask);
router.patch("/:taskId", updateTaskValidator, updateTask);
router.delete("/:taskId", deleteTaskValidator, deleteTask);

module.exports = router;
