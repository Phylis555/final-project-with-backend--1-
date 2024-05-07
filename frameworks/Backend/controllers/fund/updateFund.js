const { imageUpload } = require("../../common/imageUpload");
const { sendOrganizationEmail } = require("../../common/sendEmail");

const Fund = require("../../models/fund.model");
const User = require("../../models/user");

const updateFund = async (req, res) => {
  try {
    const formData = req.body;
    const fundId = req.params.id;
    const imageIsUpdated = formData.imageIsUpdated;

    // set fund status to pending
    formData.status = "pending";

    // if image is updated, upload image to cloudinary
    if (imageIsUpdated) {
      const imageBase64 = formData.fundImage;
      formData.fundImage = await imageUpload(imageBase64);
    }

    let currFund = await Fund.findById(fundId);

    if (currFund.organizationID != req.userId)
      throw new Error("Not correct user for this action");

    // Update fund document with new form data
    currFund.set(formData);
    await currFund.save();
    res.status(200).send({ status: "fund updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  updateFund,
};
