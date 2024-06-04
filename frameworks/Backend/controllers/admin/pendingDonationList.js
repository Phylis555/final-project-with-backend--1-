const Donation = require("../../models/donation.model");

const getAllPendingDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ status: "pending" });
    res.status(200).json(donations);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getAllPendingDonations,
};
