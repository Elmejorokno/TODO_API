const jwt = require("jsonwebtoken");
const BaseError = require("../errors/BaseError");

/**
 * Middleware that checks the JWT sent in the authorization
 * header against the Bearer standard.
 * Save the user id in `req.userId`.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 * If exists the jwt from the user and it's valid will
 * return the next() function, another case will return an error.
 */
const checkJWT = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      const baseError = new BaseError(
        "INVALID_HEADER_JWT",
        401,
        `The authorization header is invalid.`
      );
      return res.status(401).json({ error: baseError });
    }

    const token = authorization.split(" ")[1];

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = userId;

    next();
  } catch (error) {
    const baseError = new BaseError("INVALID_JWT", 400, error.message);
    return res.status(400).json({ error: baseError });
  }
};

module.exports = checkJWT;
