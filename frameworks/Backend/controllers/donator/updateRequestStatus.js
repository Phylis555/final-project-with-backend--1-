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
    currRequest = await DonationRequest.findByIdAndUpdate(req.params.id, updateRequest);
    // const currRequest = await DonationRequest.findById(req.params.id);
    const currDonation = await Donation.findById(currRequest.donationID);
    // console.log(currDonation.wantedItems);
    //currDonation.wantedItems.forEach((item) => console.log(item.receivedAmount));
    await Promise.all(currRequest.items.map(async (currItem) => {
      // console.log(item.item);
      // console.log(currDonation.wantedItems[0].item);
      itemId = currItem.item;
      let donationItem = currDonation.wantedItems.find((wantedItem) => {
        return wantedItem.item.toString() === itemId.toString()});
      if(donationItem.receivedAmount + currItem.receivedAmount > donationItem.wantedQuantity)
        donationItem.receivedAmount = donationItem.wantedQuantity;
      else
        donationItem.receivedAmount += currItem.receivedAmount;
    }));

    const completed = currDonation.wantedItems.reduce((acc,val) => {
      return val.wantedQuantity === val.receivedAmount && acc === 1 ? 1 : 0;
    }, 1)
    if(completed)
      currDonation.status = 'completed';
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
    const updateRequest = {
      requestStatus: "rejected",
    };
    await DonationRequest.findByIdAndUpdate(req.params.id, updateRequest)
      .then((request) => {
        sendRejectedEmail(req.body.email, req.body.title);
        console.log(request);
        res.status(201).json({
          message: "Requetsted updated",
        });
      })
      .catch((err) => {
        res.status(201).json({
          message: err,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  acceptDonationRequest,
  rejectDonationRequest,
};
