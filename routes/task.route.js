const express = require("express");
const {
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const router = express.Router();

router.post("/", createTask);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

module.exports = router;
