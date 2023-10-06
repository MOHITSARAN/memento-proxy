const config = require("config");
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

app.use(cookieParser());

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

//API
app.use("/api/v1", router.nftRouter);
app.use(haltOnTimedout);

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err,
    });
  });
}

app.listen(config.get("app.connection.port"), function () {
  console.log(`Server starting on port ${config.get("app.connection.port")}!`);
});

module.exports = app;
