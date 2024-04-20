const { sendDonationDeletedEmail } = require("../../common/sendEmail");
const Donation = require("../../models/donation.model");
const Request = require("../../models/donationRequest.model");

const deleteDonation = async (req, res) => {
  try {

    //var donationTitle = "";
    const donationID = req.params.id;
    const donation = await Donation.findById(donationID).populate('wantedItems').exec();

    //***** will work after authentication is dealth with *****/
    // if(req.userID !== donation.userID)
    //   throw new Error('Donation user different than token user');

    console.log(donation.wantedItems);

    const completed = donation.wantedItems.reduce((acc,val) => {
      return 0 < val.receivedAmount || acc === 1 ? 1 : 0;
    }, 0)

    if(completed)
      throw new Error('Donation already has items donated to it.');
      

    await Request.deleteMany({donationID : donationID});

    await Donation.deleteOne({_id: donationID});

    res.status(200).send({
      msg: "donation succesfully deleted",
    });

  } catch (error) {
    console.error('Database error:', error);

    let statusCode = 500;
    let errorMessage = 'Database error';

    if (error.message === 'Donation user different than token user') {
        statusCode = 400;
    }

    return res.status(statusCode).json({ message: error.message, error: error });
  }
};

module.exports = {
  deleteDonation,
};
