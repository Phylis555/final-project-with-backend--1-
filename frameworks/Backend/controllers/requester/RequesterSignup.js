const bcrypt = require("bcrypt");
const saltRounds = 10; // For hashing passwords
const SignUp = require("../../models/requester.model");
const { validationResult } = require("express-validator/check");
const { sendEmail } = require("../../common/sendEmail");

const requesterSignUp = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.status = 422;
    error.details = errors.array();
    return next(error);
  }
  const userData = req.body; // get user data

  try {
    const signup = await SignUp.findOne({ email: userData.email });
    if (signup) {
      const error = new Error("The user already exists");
      error.status = 400;
      throw error;
    }

    const hashedPassword = bcrypt.hashSync(userData.password, saltRounds); // hash the password
    userData.password = hashedPassword; // set the hashed password to the userData object

    //create new account
    const newRequester = new SignUp(userData);
    //this should prevent someone from manually putting themselves as admin
    newRequester.role = "1984";
    const signUp = await newRequester.save();
    sendEmail(signUp.email);
    res.status(201).json({
      message: "User account created successfully",
      Signup: signUp,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = { requesterSignUp };
