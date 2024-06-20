const Request = require("../../models/requestFund.model");

const getMyRequests = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const requests = await Request.find({ userId });

    res.status(200).send({ requests });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getMyRequests,
};
