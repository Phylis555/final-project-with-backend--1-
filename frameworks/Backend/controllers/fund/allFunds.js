const Fund = require("../../models/fund.model");

const getAllFunds = async (req, res, next) => {
  try {
    const funds = await Fund.find();
    res.status(200).json(funds);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getAllFunds,
};
