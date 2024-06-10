const Fund = require("../../models/fund.model");

const getFund = async (req, res, next) => {
  try {
    const fund = await Fund.findById(req.params.id);
    res.status(200).send({ fund });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getFundByStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    const funds = await Fund.find({ status });
    res.status(200).send({ funds });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getFund,
  getFundByStatus,
};
