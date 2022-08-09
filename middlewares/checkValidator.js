const { validationResult } = require("express-validator");
const BaseError = require("../errors/BaseError");

/**
 * Middleware that check if the validator from express-validator don't have any error.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 * If there is no one error will return the next() function,
 * another case will return an error.
 */
const checkValidator = (req, res, next) => {
  try {
    validationResult(req).throw();

    return next();
  } catch (error) {
    const errors = error
      .array()
      .map((error) => new BaseError("DATA_INVALID", 400, error.msg));

    return res.status(400).json({ error: errors });
  }
};

module.exports = checkValidator;
