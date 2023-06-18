const express = require("express");
const app = express();
const db = require("./db");

const usersRouter = require("./users/routes");

app.use("/user", usersRouter);

app.listen(3500, function () {
  console.log("Server started on port 3500");
});
