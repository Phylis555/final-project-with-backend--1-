const Fund = require("../../models/fund.model");

<<<<<<< HEAD
const getRequestedFunds = (req, res, next) => {
  try {
    const funds = Fund.find({ status: "pending" });
=======
const getRequestedFunds = async (req, res, next) => {
  try {
    const funds = await Fund.find({ status: "pending" });
>>>>>>> 4cc057e65d7150b4196f2678defddcfdbb09f3b6
    res.status(200).json(funds);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

<<<<<<< HEAD
const getApprovedFunds = (req, res, next) => {
  try {
    const funds = Fund.find({ status: "approved" });
=======
const getApprovedFunds = async (req, res, next) => {
  try {
    const funds = await Fund.find({ status: "approved" });
>>>>>>> 4cc057e65d7150b4196f2678defddcfdbb09f3b6
    res.status(200).json(funds);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getRequestedFunds,
  getApprovedFunds,
};
