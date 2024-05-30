const { imageUpload } = require("../../common/imageUpload");
const { body, validationResult } = require("express-validator");
const Donation = require("../../models/donation.model");

const editDonation = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect");
      error.status = 422;
      throw error;
    }

    const donationID = req.params.id;

    const { donationTitle, email, contactNumber, donationDescription } =
      req.body;

    const updateDonation = {
      donationTitle,
      email,
      contactNumber,
      donationDescription,
      status: "pending",
    };

    const donation = await Donation.findById(donationID);
    console.log(donation.userID !== req.userId);
    if (donation.userID !== req.userId)
      throw new Error("This user isn't allowed to do this action");

    Object.assign(donation, updateDonation);
    console.log(donation);

    await donation.save();
    res.status(200).send({ status: "donation updated" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  editDonation,
};
