const Model = require("../database");

// List model.
class Att extends Model {
  static get tableName() {
    return "CHECKINOUT";
  }
}
module.exports = Att;
