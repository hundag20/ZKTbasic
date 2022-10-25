const Model = require("../database2");

// List model.
class Vehicle extends Model {
  static get tableName() {
    return "1vehicles";
  }
}
module.exports = Vehicle;
