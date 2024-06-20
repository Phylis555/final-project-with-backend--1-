const { sendOrganizationEmail } = require("../../common/sendEmail");
const Fund = require("../../models/fund.model");
const FundDonation = require("../../models/fundDonation.model");
const Requester = require("../../models/requester.model");
const { admin } = require("../../config/roles_list");

// Delete the fund details from database
const deleteFund = async (req, res, next) => {
  try {
    const fundID = req.params.id;

    const currFund = await Fund.findById(fundID);

    if (currFund.organizationID != req.userId && req.role != admin) {
      const error = new Error("Not correct user for this action");
      error.status = 422;
      throw error;
    }

    currFund.status = "removed";
    await currFund.save();

    res.status(200).send({
      msg: "Fund succesfully deleted.",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Mark the status of the fund as removed
const removeFund = async (req, res, next) => {
  try {
    const fundID = req.params.id;
    await Fund.findByIdAndUpdate(fundID, { status: "removed" });
    const fund = await Fund.findById(fundID, { title: 1 });

    //Currently not interested in sending mails to these users, need to think if to change it.
    //Not sure if this function even works (no await?)

    // const users = FundDonation.distinct("userID", { fundID: fundID })
    // users.forEach((user) => {
    //   Requester.findById(user, { email: 1 }).then((requester) => {
    //     console.log("Sending email to " + requester.email);
    //     sendOrganizationEmail(
    //       requester.email,
    //       "Fund Removed - " + fund.title,
    //       "A fund you donated to has been removed by the organization. Donated amount will be refunded to your account. Contact the organization for more details. Thank you for your support."
    //     );
    //   });
    // });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  deleteFund,
  removeFund,
};
