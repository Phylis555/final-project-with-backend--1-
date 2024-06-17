const User = require("../../models/requester.model");

<<<<<<< HEAD
const getAllUsers = (req, res, next) => {
  try {
    const organizations = User.find();
=======
const getAllUsers = async (req, res, next) => {
  try {
    const organizations = await User.find();
>>>>>>> 4cc057e65d7150b4196f2678defddcfdbb09f3b6
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
