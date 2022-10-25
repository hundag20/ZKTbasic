const Model = require("../database2");

// List model.
class OfficeEquip extends Model {
  static get tableName() {
    return "Office equipment all";
  }
}
module.exports = OfficeEquip;
