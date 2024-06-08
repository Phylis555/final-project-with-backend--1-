const bcrypt = require("bcrypt");
const saltRounds = 10; // For hashing passwords
const { validationResult } = require("express-validator/check");
const { sendEmail } = require("../common/sendEmail");

const User = require("../models/user");

// Register new User
const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.status = 422;
    error.details = errors.array();
    return next(error);
  }

  const formData = req.body;

  try {
    const existingUser = await User.findOne({ username: formData.username });
    if (existingUser) {
      const error = new Error("User already exists");
      error.status = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(formData.password, saltRounds);
    formData.password = hashedPassword;

    const newUser = new User(formData);

    const savedUser = await newUser.save();
    if (await sendEmail(savedUser.email, next)) {
      const error = new Error("Failed to send email");
      error.status = 400;
      throw error;
    }

    return res.status(201).json({
      message: "User created successfully",
      user: savedUser,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  createUser,
};
