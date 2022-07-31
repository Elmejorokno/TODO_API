const jwt = require("jsonwebtoken");

/**
 * Create and sign a refresh JWT with the id from the user.
 * @param {object} userId
 * @returns The JWT token with sign and expiration date in 15 days.
 */
const createRefreshJWT = ({ userId }) => {
  return jwt.sign({ userId }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "15d",
  });
};

module.exports = createRefreshJWT;
