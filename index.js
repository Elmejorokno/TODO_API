const express = require("express");
const cors = require("cors");
const connectDb = require("./database/connnection");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/list", require("./routes/list.route"));
app.use("/api/v1/task", require("./routes/task.route"));
app.use("/", require("./routes/user.route"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is listenning on port ${PORT} 🚀.`);

  connectDb();
});
