const Donation = require("../../models/donation.model");
const DonationRequest = require("../../models/donationRequest.model");
const Item = require("../../models/item.model");

const sendDonationRequest = async (req, res) => {
  try {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(422).json({message: 'Validation failed.', error : errors.array()});
    }

    const {
      donationID,
      requesterName,
      requesterEmail,
      requesterContact,
      requestDescription,
      donatedItems
    } = req.body;
    console.log(donatedItems);


    const newRequest = new DonationRequest({
      donationID,
      requesterName,
      requesterEmail,
      requesterContact,
      requestDescription,
      items : donatedItems
    });
    await newRequest.save();
    res.status(201).json({
      message: "Requetsted created successfully",
    });
  } catch (error) {}
};

module.exports = {
  sendDonationRequest,
};
