var http = require("http");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const viewAtts = require("./controllers/viewAtts.controller");
const logger = require("./controllers/logger");
const { verify } = require("./controllers/auth.controller");

const _PORT = 3002;

const app = express();
const getNewDate = async (x) => {
  const today = new Date();

  const newDate = today.getDate() - x;
  if (newDate <= 0) {
    //FIXME: //TODO: decrementing 1/7 days from today...but when today's date is <1 / <7
  } else {
    return {
      year: today.getFullYear(),
      month: today.getMonth(),
      date: newDate,
    };
  }
};

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'static')));

app.post("/v1/today", verify, async (req, res) => {
  try {
    res.set("Access-Control-Allow-Origin", "*");
    const today = new Date();
    const dateLower = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const todayAtts = await viewAtts(dateLower, today);
    return res.status(200).send({
      message: "success",
      data: todayAtts,
    });
  } catch (err) {
    logger("error", err);
    return res.status(500).send({
      message: "something went wrong",
      error: err,
    });
  }
});
app.post("/v1/yest", verify, async (req, res) => {
  try {
    res.set("Access-Control-Allow-Origin", "*");
    const today = new Date();

    const result = await getNewDate(1);
    const dateLower = new Date(result.year, result.month, result.date);
    const dateHigher = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const todayAtts = await viewAtts(dateLower, dateHigher);
    return res.status(200).send({
      message: "success",
      data: todayAtts,
    });
  } catch (err) {
    return res.status(500).send({
      message: "something went wrong",
      error: err,
    });
  }
});
app.post("/v1/week", verify, async (req, res) => {
  try {
    res.set("Access-Control-Allow-Origin", "*");
    const today = new Date();
    const result = await getNewDate(7);
    const dateLower = new Date(result.year, result.month, result.date);
    const dateHigher = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const todayAtts = await viewAtts(dateLower, dateHigher);
    return res.status(200).send({
      message: "success",
      data: todayAtts,
    });
  } catch (err) {
    logger("error", err);
    return res.status(500).send({
      message: "something went wrong",
      error: err,
    });
  }
});

app.post("/v1/logs", (req, res) => {
  const content = fs.readFileSync(`./combined.log`, {
    encoding: "utf8",
    flag: "r",
  });
  res.send(content);
});
// app.post("/v1/env", (req, res) => {
//   const content = fs.readFileSync(`./.env.production`, {
//     encoding: "utf8",
//     flag: "r",
//   });
//   res.send(content);
// });
http.createServer(app).listen(_PORT, (err) => {
  if (err) logger("error", err);
  else logger("info", `Hr app running on ${_PORT}`);
});
module.exports = { app, _PORT };

/*
TODO: validate token on requests
*/
