const Request = require("../../models/requestFund.model");

const getRequestersRequest = async (req, res, next) => {
  try {
    const requesterId = req.params.id;

    const requests = await Request.find({ _id: requesterId });

    res.status(200).send({ requests });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getRequestersRequest,
};
