const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  _order: {
    type: Number
  },
  promotionName: {
    type: String,
    maxlength: 50
  },
  type: {
    type: String,
    maxlength: 50
  },
  userGroupName: {
    type: String,
    maxlength: 50
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
});
const Promotion = model("Promotion", userSchema);

module.exports = Promotion;

