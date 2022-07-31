const saveCookieRefreshJWT = (refreshJWT, res) => {
  res.cookie("refreshJWT", refreshJWT, {
    httpOnly: true,
    secure: !(process.env.MODE === "developer"),
    maxAge: 1000 * 60 * 60 * 24 * 15, //15 days
  });
};

module.exports = saveCookieRefreshJWT;
