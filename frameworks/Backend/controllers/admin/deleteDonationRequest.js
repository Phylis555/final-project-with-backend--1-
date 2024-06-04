const DonationRequest = require("../../models/donation.model");

const deleteDonationRequest = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);

    await DonationRequest.findByIdAndDelete(id);
    res.status(200).send({
      msg: "Requested Donation succesfully deleted",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  deleteDonationRequest,
};
