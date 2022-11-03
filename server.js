var http = require("http");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const viewAtts = require("./controllers/viewAtts.controller");
const logger = require("./controllers/logger");
// const FixedPlantEquip = require("./models/fa_FixedPlantEquip.model");
// const Vehicle = require("./models/fa_Vehicle.model");
// const FixtureFitting = require("./models/fa_FixtureFitting.model");
// const FreeStandEquip = require("./models/fa_FreeStandEquip.model");
// const OfficeEquip = require("./models/fa_OfficeEquipAll.model");
// const Pooling = require("./models/fa_Pooling0.model");

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

app.get("/v1/today", cors(), async (req, res) => {
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
app.get("/v1/yest", cors(), async (req, res) => {
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
app.get("/v1/week", cors(), async (req, res) => {
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

app.get("/v1/logs", cors(), (req, res) => {
  const content = fs.readFileSync(`./combined.log`, {
    encoding: "utf8",
    flag: "r",
  });
  res.send(content);
});
// app.get("/v1/env", cors(), (req, res) => {
//   const content = fs.readFileSync(`./.env.production`, {
//     encoding: "utf8",
//     flag: "r",
//   });
//   res.send(content);
// });

http.createServer(app).listen(3002, (err) => {
  if (err) logger("error", err);
  else logger("info", "Hr app running on 3002");
});
module.exports = app;

/*
TODO: validate token on requests
*/
