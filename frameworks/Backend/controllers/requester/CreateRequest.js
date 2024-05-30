const Request = require("../../models/requestFund.model");
const { imageUpload } = require("../../common/imageUpload");
const { validationResult } = require("express-validator/check");

const createRequest = async (req, res, next) => {
  console.log("before enter");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed.", error: errors.array() });
  }
  const formData = req.body;
  console.log("before donatedItems");
  console.log(formData.donatedItems);

  formData.requestImage = await imageUpload(formData.requestImage);

  currDonation = await Donation.findById(formData.donationID);
  console.log(currDonation);

  // currDonation.wantedItems.forEach((item) =>{
  //     //if(formData.donatedItems.find(item._id))
  // })

  const newRequest = new Request(formData);
  newRequest
    .save()
    .then((request) => {
      res.status(201).json({
        message: "Request created successfully",
        request: request,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error creating request",
        error: err,
      });
    });
};

module.exports = { createRequest };
