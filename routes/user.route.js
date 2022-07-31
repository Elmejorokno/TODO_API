const express = require("express");
const {
  register,
  login,
  refreshToken,
} = require("../controllers/user.controller");
const {
  registerUserValidator,
  loginUserValidator,
} = require("../validators/user.validator");
const checkRefreshJWT = require("../middlewares/checkRefreshJWT");

const router = express.Router();

router.post("/register", registerUserValidator, register);
router.post("/login", loginUserValidator, login);
router.get("/refresh", checkRefreshJWT, refreshToken);

module.exports = router;
