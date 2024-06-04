const User = require("../../models/requester.model");

const getAllUsers = (req, res, next) => {
  try {
    const organizations = User.find();
    res.status(200).json(organizations);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getAllUsers,
};
