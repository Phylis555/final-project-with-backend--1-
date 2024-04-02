const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  itemCategory: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  }
});

const item = mongoose.model("item", itemSchema);
module.exports = item;
