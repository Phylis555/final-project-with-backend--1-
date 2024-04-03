const mongoose = require("mongoose");
const Item = require("./item.model");
const Schema = mongoose.Schema;

const donationSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  donationTitle: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  donationDescription: {
    type: String,
    required: true,
  },
  donationImage: {
    type: String,
    required: true,
    default: "https://i.postimg.cc/4yT0N7m2/Donation.jpg",
  },
  numberOfRequests: {
    type: Number,
    required: true,
    default: 0,
  },
  location: {
    type: String,
    required: true,
  },
  donationStartDate: {
    type: Date,
    default: Date.now,
  },
  donationEndDate: {
    type: Date,
  },
  wantedItems: [{
    item: {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    },
    wantedQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    receivedAmount: {
      type: Number,
      required: true,
      default: 0,
    }
  }]
});

const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;
