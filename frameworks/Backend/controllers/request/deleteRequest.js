const Requests = require("../../models/requestFund.model");

const deleteRequest = async (req, res, next) => {
  try {
    const requestID = req.params.id;

    await Requests.findByIdAndDelete(requestID);

    res.status(200).send({
      msg: "Request deleted successfully.",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  deleteRequest,
};
