var http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const auth = require("./controllers/auth.controller");
// const addUser = require("./controllers/addUser.controller");
// const viewAtts = require("./controllers/viewAtts.controller");
const fa = require("./controllers/fa.controller");
const FixedPlantEquip = require("./models/fa_FixedPlantEquip.model");
const Vehicle = require("./models/fa_Vehicle.model");
const FixtureFitting = require("./models/fa_FixtureFitting.model");
const FreeStandEquip = require("./models/fa_FreeStandEquip.model");
const OfficeEquip = require("./models/fa_OfficeEquipAll.model");
const Pooling = require("./models/fa_Pooling0.model");
const CompHard = require("./models/fa_CompHard.model");
const All = require("./models/fa_All.model");

const app = express();

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

//ra routes
app.get("/v1/fixedplantequip", cors(), (req, res) =>
  fa(req, res, FixedPlantEquip)
);
app.get("/v1/fixturefitting", cors(), (req, res) =>
  fa(req, res, FixtureFitting)
);
app.get("/v1/freestandequip", cors(), (req, res) =>
  fa(req, res, FreeStandEquip)
);
app.get("/v1/officeequipall", cors(), (req, res) => fa(req, res, OfficeEquip));
app.get("/v1/pooling", cors(), (req, res) => fa(req, res, Pooling));
app.get("/v1/vehicle", cors(), (req, res) => fa(req, res, Vehicle));
app.get("/v1/compHard", cors(), (req, res) => fa(req, res, CompHard));
app.get("/v1/all", cors(), (req, res) => fa(req, res, All));
http.createServer(app).listen(3002, (err) => {
  if (err) console.log("err", err);
  console.log("fa back-end running on 3002");
});
module.exports = app;

/*
TODO: validate token on requests
*/
