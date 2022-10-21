const Att = require("../models/checkinout.model");
const User = require("../models/User.model");

const viewAtts = async (dateLower, dateHigher) => {
  dateHigher.setHours(dateHigher.getHours() + 3);
  dateLower.setHours(dateLower.getHours() + 3);
  console.log(dateLower, dateHigher);
  const atts = await Att.query()
    .where("checktime", ">", dateLower)
    .where("checktime", "<", dateHigher)
    .orderBy("checktime", "DESC");
  let attsWithInfo = [];
  for (el of atts) {
    const user = await User.query().findOne({ USERID: el.USERID });
    attsWithInfo.push({
      userInfo: user,
      att: el,
    });
  }
  return attsWithInfo;
};
module.exports = viewAtts;
