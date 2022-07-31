const { body, param } = require("express-validator");
const checkValidator = require("../middlewares/checkValidator");

const createTaskValidator = [
  body("task.taskName", "Invalid task name.")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("The company name must be between 2 or 30 characters long.")
    .escape(),
  body("task.listId", "Invalid list id.").trim().isMongoId().escape(),

  (req, res, next) => checkValidator(req, res, next),
];

const updateTaskValidator = [
  body("task.taskName", "Invalid task name.")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("The company name must be between 2 or 30 characters long.")
    .escape()
    .optional({ nullable: true }),
  body("task.completed", "Invalid completed value.")
    .trim()
    .isBoolean()
    .optional({ nullable: true }),
  param("taskId", "Invalid task id.").trim().isMongoId().escape(),

  (req, res, next) => checkValidator(req, res, next),
];

const deleteTaskValidator = [
  param("taskId", "Invalid task id").trim().isMongoId().escape(),

  (req, res, next) => checkValidator(req, res, next),
];

module.exports = {
  createTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
};
