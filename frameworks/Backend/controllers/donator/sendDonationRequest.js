const Donation = require("../../models/donation.model");
const DonationRequest = require("../../models/donationRequest.model");
const Item = require("../../models/item.model");
const { validationResult } = require("express-validator/check");

const sendDonationRequest = async (req, res) => {
  try {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect");
      error.status = 422;
      throw error;
    }

    const {
      donationID,
      requesterName,
      requesterEmail,
      requesterContact,
      requestDescription,
      donatedItems,
    } = req.body;
    console.log(donatedItems);

    const newRequest = new DonationRequest({
      donationID,
      requesterName,
      requesterEmail,
      requesterContact,
      requestDescription,
      items: donatedItems,
    });
    await newRequest.save();
    res.status(201).json({
      message: "Requetsted created successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  sendDonationRequest,
};
