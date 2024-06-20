const crypto = require("crypto");
const Requester = require("../models/requester.model");
const { sendResetEmail, sendEmail } = require("../common/sendEmail");
const { validationResult } = require("express-validator/check");

const bcrypt = require("bcrypt");
const saltRounds = 10; // For hashing passwords

handleReset = async (req, res, next) => {
  crypto.randomBytes(32, async (err, buffer) => {
    try {
      if (err) throw new Error("Error generating reset token: " + err.message);

      const token = buffer.toString("hex");
      const user = await Requester.findOne({ email: req.body.email });

      if (!user) throw new Error("User not found");

      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000;
      await user.save();
      sendResetEmail(req.body.email, token);

      res.status(200).json({
        message: "Reset token sent successfully",
      });
    } catch (error) {
      console.error("Error in reset password:", error);

      res.status(500).json({
        message: "An error occurred while processing your request",
        error: error.message,
      });
    }
  });
};

changePassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.status = 422;
    error.details = errors.array();
    return next(error);
  }

  try {
    const newPassword = req.body.password;
    const passwordToken = req.body.token;
    let user = await Requester.findOne({ resetToken: passwordToken });

    if (!user) {
      const error = new Error("Invalid or expired token");
      error.status = 400;
      throw error;
    }

    if (Date.now() > Date(user.resetTokenExpiration)) {
      const error = new Error("Invalid or expired token");
      error.status = 401;
      throw error;
    }

    const saltRounds = 10; // Example salt rounds
    user.passwsord = hashedPassword;
    // user.resetToken = null;
    // user.resetTokenExpiration = undefined;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  handleReset,
  changePassword,
};
