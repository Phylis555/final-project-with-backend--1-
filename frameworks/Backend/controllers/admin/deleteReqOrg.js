const Organization = require("../../models/organization.model");

const deleteReqOrganization = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);

    await Organization.findByIdAndDelete(id);
    res.status(200).send({
      msg: "Requested Organization succesfully deleted",
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  deleteReqOrganization,
};
