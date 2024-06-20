const FundDonation = require("../../../models/fundDonation.model");
const User = require("../../../models/user");
const Fund = require("../../../models/fund.model");

const getDashboardSummary = async (req, res, next) => {
  const { organizationID } = req.params;
  const result = {
    totalDonations: 0,
    totalDonors: 0,
    totalFunds: 0,
    activeFunds: 0,
    totalFundsAmount: 0,
  };

  try {
    const contributions = await FundDonation.find({
      organizationID: organizationID,
    })
    // get total donations received
    result.totalDonations = contributions.length;

    // get the number of donors
    const donors = new Set();
    for (const contribution of contributions) {
      donors.add(contribution.userID);
    }
    result.totalDonors = donors.size;
    
    const funds = await Fund.find({
      organizationID: organizationID,
    })
    result.totalFunds = funds.length;
    for (const fund of funds) {
      if (fund.status === "approved") {
        result.activeFunds++;
      }
      result.totalFundsAmount += fund.currentAmount;
    }
    res.status(200).send({
      summary: result,
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getDashboardSummary,
};
