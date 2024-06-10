const Request = require("../../models/requestFund.model");
const Donation = require("../../models/donation.model");
const { imageUpload } = require("../../common/imageUpload");
const { validationResult } = require("express-validator/check");

const createRequest = async (req, res, next) => {
  console.log("before enter");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.status = 422;
    return next(error);
  }

  const formData = req.body;
  console.log("before donatedItems");
  console.log(formData.donatedItems);

  try {
    formData.requestImage = await imageUpload(formData.requestImage);

    // const currDonation = await Donation.findById(formData.donationID);
    // console.log(currDonation);

    // currDonation.wantedItems.forEach((item) =>{
    //     //if(formData.donatedItems.find(item._id))
    // })

    const newRequest = new Request(formData);
    const request = await newRequest.save();

    res.status(201).json({
      message: "Request created successfully",
      request: request,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = { createRequest };
