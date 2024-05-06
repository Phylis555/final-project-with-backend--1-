const {
  sendAcceptedEmail,
  sendRejectedEmail,
} = require("../../common/sendEmail");
const Donation = require("../../models/donation.model");
const DonationRequest = require("../../models/donationRequest.model");

const acceptDonationRequest = async (req, res) => {
  try {
    const updateRequest = {
      requestStatus: "accepted",
    };
    const currRequest = await DonationRequest.findById(req.params.id);

    // const currRequest = await DonationRequest.findById(req.params.id);
    const currDonation = await Donation.findById(currRequest.donationID);
    console.log(req.userId != currDonation.userID);
    if (req.userId != currDonation.userID)
      throw new Error("Not correct user for this action");

    currRequest.requestStatus = "accepted";
    currRequest.save();
    // console.log(currDonation.wantedItems);
    //currDonation.wantedItems.forEach((item) => console.log(item.receivedAmount));

    await Promise.all(
      currRequest.items.map(async (currItem) => {
        // console.log(item.item);
        // console.log(currDonation.wantedItems[0].item);
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
    //currDonation.wantedItems.forEach((item) => console.log(item.receivedAmount));
    //sendAcceptedEmail(req.body.email, req.body.title); **** NEED TO CHANGE ****
    await currDonation.save();
    res.status(201).json({
      status: currDonation.status,
      message: "Request updated",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const rejectDonationRequest = async (req, res) => {
  try {
    const request = await DonationRequest.findById(req.params.id);
    const donation = await Donation.findById(request.donationID).select(
      "userID"
    );

    console.log(req.userId != donation.userID);
    if (donation.userID != req.userId)
      throw new Error("Not correct user for this action");

    request.requestStatus = "rejected";
    await request.save();
    // sendRejectedEmail(req.body.email, req.body.title);
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
