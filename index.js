const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./database/connnection");
const checkJWT = require("./middlewares/checkJWT");
require("dotenv").config();

const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    origin: function (origin, callback) {
      if ([process.env.ORIGIN_ALLOWED].includes(origin)) {
        return callback(null, origin);
      }

      return callback("Origin is not allowed.");
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/lists", checkJWT, require("./routes/list.route"));
app.use("/api/v1/tasks", checkJWT, require("./routes/task.route"));
app.use("/", require("./routes/user.route"));
app.use("*", (req, res) => {
  return res.status(404).json({ error: "Page not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is listenning on port ${PORT} 🚀.`);

  connectDb();
});
