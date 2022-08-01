const jwt = require("jsonwebtoken");

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
      const error = new Error(`Refresh JWT isn't exists.`);
      error.status = 401;
      throw error;
    }

    const { userId } = jwt.verify(
      cookieRefreshJWT,
      process.env.REFRESH_JWT_SECRET
    );

    req.userId = userId;

    next();
  } catch (error) {
    return res.status(error.status || 400).json({ error, msg: error.message });
  }
};

module.exports = checkRefreshJWT;
