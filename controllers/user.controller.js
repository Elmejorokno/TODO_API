const User = require("../models/User");

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });

    return res.status(201).json({ user });
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

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(error.status || 400).json({ error, msg: error.message });
  }
};

module.exports = {
  register,
  login,
};
