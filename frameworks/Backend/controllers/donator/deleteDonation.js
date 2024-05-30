const { sendDonationDeletedEmail } = require("../../common/sendEmail");
const Donation = require("../../models/donation.model");
const Request = require("../../models/donationRequest.model");

const deleteDonation = async (req, res, next) => {
  try {
    //var donationTitle = "";
    const donationID = req.params.id;
    const donation = await Donation.findById(donationID)
      .populate("wantedItems")
      .exec();

    //***** will work after authentication is dealth with *****/
    // if(req.userID !== donation.userID)
    //   throw new Error('Donation user different than token user');

    console.log(donation.wantedItems);

    if (donation.userID != req.userId) {
      const error = new Error("Donation doesn't belong to this user");
      error.status = 401;
      throw error;
    }

    const completed = donation.wantedItems.reduce((acc, val) => {
      return 0 < val.receivedAmount || acc === 1 ? 1 : 0;
    }, 0);

    if (completed) {
      const error = new Error("Donation already has items donated to it.");
      error.status = 400;
      throw error;
    }

    await Request.deleteMany({ donationID: donationID });

    await Donation.deleteOne({ _id: donationID });

    res.status(200).send({
      msg: "donation succesfully deleted",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  deleteDonation,
};
