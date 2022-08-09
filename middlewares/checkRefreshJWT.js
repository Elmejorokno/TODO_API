const jwt = require("jsonwebtoken");
const BaseError = require("../errors/BaseError");

/**
 * Middleware that checks the refresh JWT saved in the `cookie.refreshToken`
 * Save the user id in `req.userId`.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 * If exists the refresh jwt and it's valid will
 * return the next() function, another case will return an error.
 */
const checkRefreshJWT = (req, res, next) => {
  const cookieRefreshJWT = req.cookies.refreshJWT;

  try {
    if (!cookieRefreshJWT) {
      const baseError = new BaseError(
        "MISSING_COOKIE_REFRESH_JWT",
        401,
        `Refresh JWT isn't exists.`
      );
      return res.status(401).json({ error: baseError });
    }

    const { userId } = jwt.verify(
      cookieRefreshJWT,
      process.env.REFRESH_JWT_SECRET
    );

    req.userId = userId;

    next();
  } catch (error) {
    const baseError = new BaseError("INVALID_REFRESH_JWT", 400, error.message);
    return res.status(400).json({ error: baseError });
  }
};

module.exports = checkRefreshJWT;
