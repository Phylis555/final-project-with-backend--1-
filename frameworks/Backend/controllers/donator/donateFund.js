const Fund = require("../../models/fund.model");
const FundDonation = require("../../models/fundDonation.model");
const { validationResult } = require("express-validator/check");

const donateToFund = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect");
      error.status = 422;
      throw error;
    }

    const fundID = req.params.id;
    const { userID, amount, organizationID } = req.body;

    if (amount <= 0) {
      const error = new Error("Donation amount has to be higher than 0");
      error.status = 400;
      throw error;
    }

    const newFund = new FundDonation({
      userID,
      fundID,
      amount,
      organizationID,
    });

    newFund.save();
    const fund = await Fund.findById(fundID);
    let newAmount = parseInt(amount) + fund.currentAmount;
    let updateFund = {};
    if (newAmount >= fund.budget) {
      updateFund = {
        currentAmount: newAmount,
        status: "completed",
      };
    } else {
      updateFund = {
        currentAmount: newAmount,
      };
    }
    await Fund.findByIdAndUpdate(fundID, updateFund);
    res.status(201).json({
      message: "Donated successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  donateToFund,
};
