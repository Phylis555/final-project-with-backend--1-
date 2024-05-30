const { imageUpload } = require("../../common/imageUpload");
const { body, validationResult } = require("express-validator");
const Donation = require("../../models/donation.model");
const { sendAcceptedEmail } = require("../../common/sendEmail");

const updateDonationStatus = async (req, res, next) => {
  try {
    // const errors = validationResult(req);
    // console.log(errors);
    // if (!errors.isEmpty()) {
    //   res.status(422).json({ errors: errors.array() });
    //   return;
    // }
    const donationID = req.params.id;
    console.log(donationID);

    const status = "active";

    const updateDonation = {
      status: status,
    };
    console.log(updateDonation);

    await Donation.findByIdAndUpdate(donationID, updateDonation)
      .then((donation) => {
        sendAcceptedEmail(donation.email);
        res.status(200).send({ message: "Status updated" });
      })
      .catch(() => {
        res.status(500).send({ message: "Error" });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateDonationStatus,
};
