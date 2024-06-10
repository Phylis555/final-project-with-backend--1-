const Organization = require("../../models/organization.model");

const deleteOrganization = async (req, res, next) => {
  try {
    const organizationID = req.params.id;

    await Organization.findByIdAndDelete(organizationID)
    res.status(200).send({
      msg: "Organization succesfully deleted.",
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  deleteOrganization,
};
