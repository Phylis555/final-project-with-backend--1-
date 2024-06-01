const Fund = require("../../../models/fund.model");
const FundDonation = require("../../../models/fundDonation.model");
const Requester = require("../../../models/requester.model");

const generateReport = async (req, res, next) => {
  const { organizationID, month } = req.params;

  const result = [];

  try {
    const donations = FundDonation.find({
      organizationID: organizationID,
      donatedDate: {
        $gte: new Date(new Date().getFullYear(), month - 1, 1),
        $lt: new Date(new Date().getFullYear(), month, 1),
      },
    })
    var index = 1;
    for (const donation of donations) {
      const row = [];
      row.push(index);
  
      const fund = await Fund.findById(donation.fundID)
      row.push(fund.title);
  
      const user = await Requester.findById(donation.userID)
      var name = user.firstName + " " + user.lastName;
      row.push(name);
  
      // convert date to string
      const date = new Date(donation.donatedDate);
      const dateString =
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear();
  
      row.push(donation.amount);
      row.push(dateString);
      result.push(row);
      index++;
    }
    // console.log(result);
    res.status(200).send({
      report: result,
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }


};

module.exports = {
  generateReport,
};
