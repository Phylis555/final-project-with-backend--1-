const { body, validationResult } = require("express-validator");
const Organization = require("../../models/organization.model");
const { sendAcceptedOrginizationEmail } = require("../../common/sendEmail");

const editOrganizationStatus = async (req, res) => {
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

    await Organization.findByIdAndUpdate(orgID, updateOrganization)
      .then((organization) => {
        console.log(organization);
        sendAcceptedOrginizationEmail(organization.email);
        res.status(200).send({ status: "Organization Status updated" });
      })
      .catch(() => {
        res.status(500).send({ status: "error" });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  editOrganizationStatus,
};
