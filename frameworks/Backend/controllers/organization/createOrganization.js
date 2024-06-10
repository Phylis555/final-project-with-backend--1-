const bcrypt = require("bcrypt");
const saltRounds = 10; // For hashing passwords
const { imageUpload } = require("../../common/imageUpload");
const { validationResult } = require("express-validator/check");

const Organization = require("../../models/organization.model");

// Register new organization
const createOrganization = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.status = 422;
    error.details = errors.array();
    return next(error);
  }

  const formData = req.body; // get data from the request body

  try {
    const organization = await Organization.findOne({ email: formData.email });
    if (organization) {
      const error = new Error("Organization already exists");
      error.status = 400;
      throw error;
    }

    const hashedPassword = bcrypt.hashSync(formData.password, saltRounds); // hash the password
    formData.password = hashedPassword; // set the hashed password to the formData object

    // upload the registration certificate
    formData.registrationCertificate = await imageUpload(
      formData.registrationCertificate
    );

    const newOrganization = new Organization(formData); // create a new organization
    await newOrganization.save(); // save the new organization to the database
    res.status(201).json({
      message: "Organization created successfully",
      organization: newOrganization,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// View all organizations
const viewAllOrganizations = async (req, res, next) => {
  Organization.find()
    .then((organizations) => {
      res.json(organizations);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error with listing organizations",
      });
    });
};

module.exports = {
  createOrganization,
  viewAllOrganizations,
};
