const {
  sendAcceptedEmail,
  sendRejectedEmail,
} = require("../../common/sendEmail");
const Donation = require("../../models/donation.model");
const DonationRequest = require("../../models/donationRequest.model");

const acceptDonationRequest = async (req, res, next) => {
  try {
    const updateRequest = {
      requestStatus: "accepted",
    };
    const currRequest = await DonationRequest.findById(req.params.id);

    const currDonation = await Donation.findById(currRequest.donationID);
    console.log(req.userId != currDonation.userID);
    if (req.userId != currDonation.userID) {
      const error = new Error("Not correct user for this action");
      error.status = 401;
      throw error;
    }
    currRequest.requestStatus = "accepted";
    currRequest.save();

    await Promise.all(
      currRequest.items.map(async (currItem) => {
        itemId = currItem.item;
        let donationItem = currDonation.wantedItems.find((wantedItem) => {
          return wantedItem.item.toString() === itemId.toString();
        });
        if (
          donationItem.receivedAmount + currItem.receivedAmount >
          donationItem.wantedQuantity
        )
          donationItem.receivedAmount = donationItem.wantedQuantity;
        else donationItem.receivedAmount += currItem.receivedAmount;
      })
    );

    const completed = currDonation.wantedItems.reduce((acc, val) => {
      return val.wantedQuantity === val.receivedAmount && acc === 1 ? 1 : 0;
    }, 1);
    if (completed) currDonation.status = "completed";

    currDonation.numberOfRequests++;
    await currDonation.save();
    res.status(201).json({
      status: currDonation.status,
      message: "Request updated",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const rejectDonationRequest = async (req, res, next) => {
  try {
    const request = await DonationRequest.findById(req.params.id);
    const donation = await Donation.findById(request.donationID).select(
      "userID"
    );

    console.log(req.userId != donation.userID);
    if (donation.userID != req.userId) {
      const error = new Error("Not correct user for this action");
      error.status = 401;
      throw error;
    }

    request.requestStatus = "rejected";
    await request.save();
    console.log(request);
    res.status(201).json({
      message: "Request updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = {
  acceptDonationRequest,
  rejectDonationRequest,
};
