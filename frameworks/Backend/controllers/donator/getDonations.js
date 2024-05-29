const Donation = require("../../models/donation.model");

const getCompletedDonations = async (req, res, next) => {
  try {
    const completedDon = await Donation.find({
      status: "completed",
      userID: req.params.id,
    });
    res.status(200).json(completedDon);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getOngoingDonations = async (req, res, next) => {
  try {
    const activeDon = await Donation.find({
      status: "active",
      userID: req.params.id,
    });
    res.status(200).json(activeDon);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getPendingDonations = async (req, res, next) => {
  try {
    const pendingDonations = await Donation.find({
      status: "pending",
      userID: req.params.id,
    });
    res.status(200).json(pendingDonations);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getRejectedDonations = async (req, res, next) => {
  try {
    const rejectedDonations = await Donation.find({
      status: "rejected",
      userID: req.params.id,
    });
    res.status(200).json(rejectedDonations);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getUserDonations = async (req, res, next) => {
  try {
    const userDonations = await Donation.find({ userID: req.params.id });
    res.status(200).json(userDonations);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getCompletedDonations,
  getOngoingDonations,
  getPendingDonations,
  getRejectedDonations,
  getUserDonations,
};
