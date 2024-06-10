const bcrypt = require("bcrypt");
const saltRounds = 10; // For hashing passwords
const UserDetails = require("../../models/requester.model");
const { validationResult } = require("express-validator/check");

const updateProfile = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect");
      error.statusCode = 422;
      throw error;
    }

    const userId = req.params.id;
    const { firstName, lastName, email, contactNumber } = req.body;

    const updateDetails = {
      firstName,
      lastName,
      email,
      contactNumber,
    };

    await UserDetails.findByIdAndUpdate(userId, updateDetails, { new: true });

    res.status(200).send({ status: "profile updated" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect");
      error.status = 422;
      throw error;
    }
    const userId = req.params.id;
    const { password } = req.body;
    const hpassword = bcrypt.hashSync(password, saltRounds);
    const updateDetails = { password: hpassword };

    await UserDetails.findByIdAndUpdate(userId, updateDetails, { new: true });

    res.status(200).send({ status: "profile updated" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = { updateProfile, updatePassword };
