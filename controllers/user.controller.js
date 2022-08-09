const User = require("../models/User");
const createRefreshJWT = require("../utils/createRefreshJWT");
const createJWT = require("../utils/createJWT");
const saveCookieRefreshJWT = require("../utils/saveCookieRefreshJWT");
const BaseError = require("../errors/BaseError");

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });

    const refreshJWT = createRefreshJWT({ userId: user._id });
    saveCookieRefreshJWT(refreshJWT, res);

    return res.status(201).json({ userId: user._id });
  } catch (error) {
    if (error.code === 11000) {
      const baseError = new BaseError(
        "USER_DUPLICATED",
        403,
        "User already exists."
      );
      return res.status(403).json({ error: baseError });
    }

    const baseError = new BaseError("ERR_REGISTER", 400, error.message);
    return res.status(400).json({ error: baseError });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      const baseError = new BaseError(
        "INVALID_CREDENTIALS",
        401,
        "Invalid credentials."
      );
      return res.status(401).json({ error: baseError });
    }

    const refreshJWT = createRefreshJWT({ userId: user._id });
    saveCookieRefreshJWT(refreshJWT, res);

    return res.status(200).json({ userId: user._id });
  } catch (error) {
    const baseError = new BaseError("ERR_LOGIN", 400, error.message);
    return res.status(400).json({ error: baseError });
  }
};

const logout = (req, res) => {
  res.clearCookie("refreshJWT");

  return res.end();
};

/**
 * Create a JWT for send it in the headers.
 * @param {*} req
 * @param {*} res
 * @returns
 * A JWT with the user id.
 */
const refreshToken = (req, res) => {
  const jwt = createJWT({ userId: req.userId });

  return res.status(201).json({ jwt });
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
