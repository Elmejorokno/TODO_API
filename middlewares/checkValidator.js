const { validationResult } = require("express-validator");

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
    return res.status(400).json({ error: error.array() });
  }
};

module.exports = checkValidator;
