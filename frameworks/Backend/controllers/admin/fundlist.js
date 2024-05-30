const Fund = require("../../models/fund.model");

const getRequestedFunds = (req, res, next) => {
  try {
    Fund.find({ status: "pending" })
      .then((Funds) => {
        res.json(Funds);
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Error fetching data",
          error: err,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

const getApprovedFunds = (req, res, next) => {
  try {
    Fund.find({ status: "approved" })
      .then((Funds) => {
        res.json(Funds);
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Error fetching data",
          error: err,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRequestedFunds,
  getApprovedFunds,
};
