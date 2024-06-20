const Donation = require("../../models/donation.model");
const Request = require("../../models/donationRequest.model");

const markDonationAsCompleted = async (req, res, next) => {
  try {
    const updateDonation = {
      status: "completed",
    };

    const donation = await Donation.findById(req.params.id);

    if (donation.userID != req.userId) {
      const error = new Error("Not correct user for this action");
      error.status = 401;
      throw error;
    }

    await Request.deleteMany({
      donationID: donation._id,
      requestStatus: "pending",
    });

    donation.status = "completed";
    await donation.save();

    res.status(200).send({ message: "marked as completed" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  markDonationAsCompleted,
};
