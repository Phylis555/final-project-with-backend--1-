const User = require("../models/user");
const Organization = require("../models/organization.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Requester = require("../models/requester.model");
const { validationResult } = require("express-validator/check");

const handleLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.status = 422;
    error.details = errors.array();
    return next(error);
  }
  // console.log(req.body)
  const { username, password, email } = req.body;
  let foundUser;

  try {
    let foundUser = await Requester.findOne({ email: email }).exec();
    if (!foundUser) {
      foundUser = await Organization.findOne({ email: email }).exec();
    }
    if (!foundUser) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      const error = new Error("Failed password compare, wrong password!");
      error.status = 401;
      throw error;
    }
    const roles = foundUser.roles;
    const _id = foundUser._id;

    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          roles: roles,
          userId: _id,
        },
      },
      "my_hard_coded_secret",
      { expiresIn: "1h" }
    );
    // Saving refreshToken with current user
    const result = await foundUser.save();

    // Creates Secure Cookie with refresh token
    // res.cookie("jwt", refreshToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "None",
    //   maxAge: 24 * 60 * 60 * 1000,
    // });

    // Send authorization roles and access token to user
    // This is probably not good logic since we are sending accessToken in normal res and not httpd like earlier
    res.status(200).json({ roles, accessToken, _id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = { handleLogin };
