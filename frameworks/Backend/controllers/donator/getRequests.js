const DonationRequest = require("../../models/donationRequest.model");
const Item = require("../../models/donationRequest.model");

const getPendingRequests = async (req, res, next) => {
  try {
    const requests = await DonationRequest.find({
      donationID: req.params.id,
      requestStatus: { $in: ["pending", "accepted"] },
    }).populate("items.item");
    res.status(200).json(requests);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getRejectedRequests = async (req, res, next) => {
  console.log(req.params.id);
  try {
    await DonationRequest.find({
      donationID: req.params.id,
      requestStatus: "rejected",
    })
      .then((requests) => {
        res.json(requests);
      })
      .catch((err) => {
        res.json({
          error: err,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

const getApprovedRequests = async (req, res, next) => {
  console.log(req.params.id);
  try {
    requests = await DonationRequest.find({
      donationID: req.params.id,
      requestStatus: "accepted",
    });
    res.status(200).json(requests);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getPendingRequests,
  getRejectedRequests,
  getApprovedRequests,
};
