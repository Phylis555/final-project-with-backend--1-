const Donation = require("../../models/donation.model");

const getAllAcceptedDonations = async (req, res, next) => {
  await Donation.find({ status: "active" })
    .then((donations) => {
      res.json(donations);
    })
    .catch((err) => {
      res.json({
        errror: err,
      });
    });
};

module.exports = {
  getAllAcceptedDonations,
};
