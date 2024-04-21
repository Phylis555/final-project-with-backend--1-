const Fund = require("../../models/fund.model");
const FundDonation = require("../../models/fundDonation.model");
const { validationResult } = require('express-validator/check');


const donateToFund = async (req, res) => {

  if (!errors.isEmpty()) {
    return res.status(422).json({message: 'Validation failed.', error : errors.array()});
  }

  try {
    console.log("is here");
    const fundID = req.params.id;
    const { userID, amount, organizationID } = req.body;
    if(amount <= 0)
      throw new Error("Amount must be above 0");

    const newFund = new FundDonation({
      userID,
      fundID,
      amount,
      organizationID
    });

    newFund.save()
      .then(async () => {
        await Fund.findById(fundID)
          .then(async (fund) => {
            // var previousAmount = fund.currentAmount;
            const amt = parseInt(amount);
            var newAmount = parseInt(amount) + fund.currentAmount;
            var updateFund = {}
            if (newAmount === fund.budget) {
              updateFund = {
                currentAmount: newAmount,
                status: "completed"
              };
            } else {
              updateFund = {
                currentAmount: newAmount,
              };
            }
            await Fund.findByIdAndUpdate(fundID, updateFund)
              .then(() => {
                res.status(201).json({
                  message: "Donated successfully",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: err,
                });
              });
          })
          .catch((err) => {
            res.status(500).json({
              message: err,
            });
          });
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  donateToFund,
};
