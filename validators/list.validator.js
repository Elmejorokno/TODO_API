const { body, param } = require("express-validator");
const checkValidator = require("../middlewares/checkValidator");

const createListValidator = [
  body("list.listName", "Invalid list name.")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("The company name must be between 2 or 30 characters long.")
    .escape(),

  (req, res, next) => checkValidator(req, res, next),
];

const updateListValidator = [
  body("list.listName", "Invalid list name.")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("The company name must be between 2 or 30 characters long.")
    .escape(),
  param("listId", "Invalid list id.").trim().isMongoId().escape(),

  (req, res, next) => checkValidator(req, res, next),
];

const deleteListValidator = [
  param("listId", "Invalid list id.").trim().isMongoId().escape(),

  (req, res, next) => checkValidator(req, res, next),
];

module.exports = {
  createListValidator,
  updateListValidator,
  deleteListValidator,
};
