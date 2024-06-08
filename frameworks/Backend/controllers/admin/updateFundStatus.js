const { imageUpload } = require("../../common/imageUpload");
const { sendAcceptedEmail } = require("../../common/sendEmail");

const Fund = require("../../models/fund.model");

const updateFundStatus = async (req, res, next) => {
  try {
    const fundId = req.params.id;

    // set fund status to accepted
    const status = "approved";

    const updateFund = {
      status,
    };

    const fund = await Fund.findByIdAndUpdate(fundId, updateFund);
    sendAcceptedEmail(fund.contactEmail);
    res.status(201).json({
      message: "Fund updated successfully",
      fund: fund,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  updateFundStatus,
};
