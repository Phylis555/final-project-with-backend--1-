const Organization = require("../../models/organization.model");

const getOrganization = async (req, res, next) => {
  try {
    const organization = await Organization.findById(req.params.id);
    res.status(200).send({
      organization,
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getOrganization,
};
