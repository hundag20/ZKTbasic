const Model = require("../database");

// List model.
class User extends Model {
  static get tableName() {
    return "USERINFO";
  }
}
module.exports = User;
