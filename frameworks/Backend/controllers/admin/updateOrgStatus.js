const { body, validationResult } = require("express-validator");
const Organization = require("../../models/organization.model");
const { sendAcceptedOrginizationEmail } = require("../../common/sendEmail");

const editOrganizationStatus = async (req, res, next) => {
  try {
    // const errors = validationResult(req);
    // console.log(errors);
    // if (!errors.isEmpty()) {
    //   res.status(422).json({ errors: errors.array() });
    //   return;
    // }
    const orgID = req.params.id;
    const status = "approved";

    const updateOrganization = {
      status,
    };

    const organization = await Organization.findByIdAndUpdate(
      orgID,
      updateOrganization
    );
    console.log(organization);
    sendAcceptedOrginizationEmail(organization.email);
    res.status(200).send({ status: "Organization Status updated" });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  editOrganizationStatus,
};
