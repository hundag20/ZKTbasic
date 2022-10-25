const Model = require("../database2");

// List model.
class All extends Model {
  static get tableName() {
    return "AllYTDDep&BookVMonthly";
  }
}
module.exports = All;
