const Donation = require("../../models/donation.model");
const Item = require("../../models/item.model");

const getOneDonationDetails = async (req, res) => {
  try {
    const donationId = req.params.id;
    donation = await Donation.findOne({ _id: donationId }).populate(
      "wantedItems.item"
    );
    res.status(200).send({ message: "Donation fetched", donation: donation });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = getOneDonationDetails;
