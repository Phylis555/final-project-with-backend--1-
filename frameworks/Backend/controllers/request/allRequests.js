const Requests = require("../../models/requestFund.model");

const getAllRequests = async (req, res, next) => {
  try {
    const requests = await Requests.find();
    res.status(200).json(requests);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getAllRequests,
};
