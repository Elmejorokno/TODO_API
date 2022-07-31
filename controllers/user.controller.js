const User = require("../models/User");
const createRefreshJWT = require("../utils/createRefreshJWT");
const createJWT = require("../utils/createJWT");
const saveCookieRefreshJWT = require("../utils/saveCookieRefreshJWT");

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });

    const refreshJWT = createRefreshJWT({ userId: user._id });
    saveCookieRefreshJWT(refreshJWT, res);

    return res.status(201).json({ refreshJWT });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(403).json({ error: { msg: `User already exists.` } });
    }

    return res.status(400).json({ error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      const error = new Error(`Invalid credentials.`);
      error.status = 401;
      throw error;
    }

    const refreshJWT = createRefreshJWT({ userId: user._id });
    saveCookieRefreshJWT(refreshJWT, res);

    return res.status(200).json({ refreshJWT });
  } catch (error) {
    return res.status(error.status || 400).json({ error, msg: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("refreshJWT");

  res.end();
};

/**
 * Create a JWT for send it in the headers.
 * @param {*} req
 * @param {*} res
 * @returns
 * A JWT with the user id.
 */
const refreshToken = (req, res) => {
  const token = createJWT({ userId: req.userId });

  return res.status(201).json({ token });
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
