const mongoose = require("mongoose");
const Item = require("./item.model");
const Schema = mongoose.Schema;

const donationRequestSchema = new Schema({
  donationID: {
    type: String,
    required: true,
  },
  requesterName: {
    type: String,
    required: true,
  },
  requesterEmail: {
    type: String,
    required: true,
  },
  requesterContact: {
    type: Number,
    required: true,
  },
  requestDescription: {
    type: String,
    required: true,
  },
  requestStatus: {
    type: String,
    default: "pending",
  },
  items: [{
    item: {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    },
    receivedAmount: {
      type: Number,
      required: true,
      default: 0,
    }
  }]
});

const DonationRequest = mongoose.model(
  "DonationRequest",
  donationRequestSchema
);
module.exports = DonationRequest;
