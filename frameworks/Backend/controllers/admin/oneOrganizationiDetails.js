const Organization = require("../../models/organization.model");

const getOneOrganizationDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const org = await Organization.findOne({ _id: id });

    res.status(200).send({ message: "Organization fetched", org: org });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = { getOneOrganizationDetails };
