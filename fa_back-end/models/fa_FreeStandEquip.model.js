const Model = require("../database2");

// List model.
class FreeStandEquip extends Model {
  static get tableName() {
    return "Free stand equipment";
  }
}
module.exports = FreeStandEquip;
