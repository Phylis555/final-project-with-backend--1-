const { sendOrganizationEmail } = require("../../common/sendEmail");
const Fund = require("../../models/fund.model");
const FundDonation = require("../../models/fundDonation.model");
const Requester = require("../../models/requester.model");
const { admin } = require("../../config/roles_list");

// Delete the fund details from database
const deleteFund = async (req, res) => {
  try {
    const fundID = req.params.id;

    const currFund = await Fund.findById(fundID);

    if (currFund.organizationID != req.userId && req.role != admin)
      throw new Error("Not correct user for this action");

    currFund.status = "removed";
    await currFund.save();

    res.status(200).send({
      msg: "Fund succesfully deleted.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: "Error with removing the fund.",
      error: error,
    });
  }
};

// Mark the status of the fund as removed
const removeFund = async (req, res) => {
  try {
    const fundID = req.params.id;
    await Fund.findByIdAndUpdate(fundID, { status: "removed" })
      .then(async () => {
        try {
          const fund = await Fund.findById(fundID, { title: 1 });
          // FundDonation.find({ fundID: fundID }, { userID: 1 })
          FundDonation.distinct("userID", { fundID: fundID }).then((users) => {
            users.forEach((user) => {
              Requester.findById(user, { email: 1 }).then((requester) => {
                console.log("Sending email to " + requester.email);
                sendOrganizationEmail(
                  requester.email,
                  "Fund Removed - " + fund.title,
                  "A fund you donated to has been removed by the organization. Donated amount will be refunded to your account. Contact the organization for more details. Thank you for your support."
                );
              });
            });
          });
        } catch (err) {
          console.log(err);
        }
        res.status(200).send({
          msg: "Fund succesfully removed.",
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Error with removing the fund.",
          error: err,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  deleteFund,
  removeFund,
};
