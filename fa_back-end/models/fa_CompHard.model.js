const Model = require("../database2");

// List model.
class CompHard extends Model {
  static get tableName() {
    return "Computer Hardware";
  }
}
module.exports = CompHard;
