const Donation = require("../../models/donation.model");
const Item = require("../../models/item.model");

const getOneDonationDetails = async (req, res) => {
  try {
    const donationId = req.params.id;
    console.log(donationId);
    await Donation.findOne({ _id: donationId }).populate('wantedItems.item')
      .then((donation) => {
        console.log(donation.wantedItems[0].item.itemCategory);
        res
          .status(200)
          .send({ message: "Donation fetched", donation: donation });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ status: "error", error: err });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getOneDonationDetails;
