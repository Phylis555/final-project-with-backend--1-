const Organization = require("../../models/organization.model");

const getApprovedOrganizations = (req, res, next) => {
  try {
    Organization.find({
      status: "approved",
    })
      .then((organizations) => {
        res.json(organizations);
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Error fetching data",
          error: err,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getApprovedOrganizations,
};
