const { check } = require("express-validator");
const checkValidator = require("../middlewares/checkValidator");

const registerUserValidator = [
  check("email", "Invalid email.").trim().isEmail().normalizeEmail(),
  check("password", "Invalid password.")
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage(`The password must be between 8 or 16 characters long`)
    .escape(),

  (req, res, next) => checkValidator(req, res, next),
];

const loginUserValidator = [
  check("email", "Invalid email.").trim().isEmail().normalizeEmail(),
  check("password", "Invalid password.")
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage(`The password must be between 8 or 16 characters long`)
    .escape(),

  (req, res, next) => checkValidator(req, res, next),
];

module.exports = { registerUserValidator, loginUserValidator };
