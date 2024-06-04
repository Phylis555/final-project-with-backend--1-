const Fund = require("../../models/fund.model");

const getOrganizationFunds = async (req, res, next) => {
  try {
    const organizationID = req.params.id;
    const funds = await Fund.find({ organizationID });
    res.status(200).send({ funds });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getFundByOrganizationAndStatus = async (req, res, next) => {
  try {
    const { organizationID, status } = req.params;
    const funds = await Fund.find({ organizationID, status });
    res.status(200).send({ funds });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getNFunds = async (req, res, next) => {
  try {
    const { limit, organizationId } = req.params;
    const funds = await Fund.find({
      status: { $in: ["approved", "completed"] },
      organizationID: organizationId,
    })
      .sort({ _id: -1 })
      .limit(Number(limit));
    res.status(200).send({ funds });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getOrganizationFunds,
  getFundByOrganizationAndStatus,
  getNFunds,
};
