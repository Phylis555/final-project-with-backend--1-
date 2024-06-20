const { imageUpload } = require("../../common/imageUpload");
const { sendEmail } = require("../../common/sendEmail");
const { validationResult } = require("express-validator/check");

const Fund = require("../../models/fund.model");

const createFund = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect");
      error.status = 422;
      throw error;
    }

    const formData = req.body;
    console.log(formData);
    const imageBase64 = formData.fundImage;
    formData.fundImage = await imageUpload(imageBase64);

    const newFund = new Fund(formData);
    const fund = await newFund.save();

    res.status(201).json({
      message: "Fund created successfully",
      fund,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  createFund,
};
