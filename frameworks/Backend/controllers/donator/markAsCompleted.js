const Donation = require("../../models/donation.model");
const Request = require("../../models/donationRequest.model");

const markDonationAsCompleted = async (req, res) => {
  try {
    const updateDonation = {
      status: "completed",
    };

    const donation = await Donation.findById(req.params.id);

    if (donation.userID != req.userId)
      throw new Error("Not correct user for this action");

    Request.deleteMany({ donationID: donation._id, requestStatus: "pending" });

    donation.status = "completed";
    await donation.save();

    res.status(200).send({ message: "marked as completed" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: error,
    });
  }
};

module.exports = {
  markDonationAsCompleted,
};
