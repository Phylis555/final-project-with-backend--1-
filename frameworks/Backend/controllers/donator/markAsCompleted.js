const Donation = require("../../models/donation.model");
const Request = require("../../models/donationRequest.model");


const markDonationAsCompleted = async (req, res) => {
  try {
    const updateDonation = {
      status: "completed",
    };

    await Donation.findByIdAndUpdate(req.params.id, updateDonation)
      .then(async (donation) => {
        await Request.deleteMany({donationID: donation._id, requestStatus: 'pending'});
        res.status(200).send({ message: "marked as completed" });
      })
      .catch((err) => {
        res.status(500).send({
          err: err,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  markDonationAsCompleted,
};
