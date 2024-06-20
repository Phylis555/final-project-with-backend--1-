const FundDonation = require("../../../models/fundDonation.model");
const Requester = require("../../../models/requester.model");
const User = require("../../../models/user");

// Get latest n contributions
const getNContributions = async (req, res, next) => {
  const { limit, organizationID } = req.params;
  const result = [];

  try {
    const contributions = await FundDonation.find({ organizationID })
      .sort({ _id: -1 })
      .limit(limit);

    for (const contribution of contributions) {
      try {
        const user = await Requester.findById(contribution.userID);

        contribution.userID = user.firstName + " " + user.lastName;
        result.push(contribution);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    }

    res.status(200).json({ contributions: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getNContributions,
};
