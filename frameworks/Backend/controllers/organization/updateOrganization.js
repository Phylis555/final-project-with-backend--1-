const bcrypt = require("bcrypt");
const saltRounds = 10; // For hashing passwords
const Organization = require("../../models/organization.model");

const updateOrganization = async (req, res, next) => {
  const formData = req.body;
  const organizationId = req.params.id;

  try {
    const organiztion = await Organization.findOne({ email: formData.email })

    if (organization || organization._id != organizationId) {
      const error = new Error("Organization doesn't exist or id isn't the same");
      error.status = 400;
      throw error;
    }

    // Update only the properties that exist in formData
  Object.keys(formData).forEach((key) => {
    organization[key] = formData[key];
  });

  await organiztion.save();
  res.status(201).json({
    message: "Organization updated successfully",
    organization: organization,
  });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};

// Update board member details
const updateOrganizationBoard = async (req, res, next) => {
  const formData = req.body;
  const organizationId = req.params.id;

  try {
    const organization = await Organization.findByIdAndUpdate(organizationId, formData)
    res.status(201).json({
      message: "Organization updated successfully",
      organization: organization,
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Change password
const changePassword = async (req, res, next) => {
  const formData = req.body;
  const organizationId = req.params.id;

  // console.log(formData, organizationId);

  const hashedPassword = bcrypt.hashSync(formData.password, saltRounds); // hash the password
  formData.password = hashedPassword; // set the hashed password to the formData object

  try {
    const organization = await Organization.findByIdAndUpdate(organizationId, formData)
    res.status(201).json({
      message: "Organization updated successfully",
      organization: organization,
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  updateOrganization,
  changePassword,
  updateOrganizationBoard,
};
