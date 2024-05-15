const express = require("express");
const isAuth = require("../middleware/verifyJWT");

const { handleLogin } = require("../controllers/authController");
const { createUser } = require("../controllers/registerController");
const { handleReset, changePassword } = require("../controllers/resetPassword");
const { body } = require("express-validator");

const router = express.Router();

router.post("/login", [body("email").normalizeEmail().isEmail()], handleLogin);
router.post(
  "/register",
  [
    body("email").normalizeEmail().isEmail(),
    body("firstName").trim().notEmpty(),
    body("lastName").trim().notEmpty(),
    body("contactNumber").trim().isMobilePhone("he-IL"),
  ],
  createUser
);
router.post("/resetPassword", handleReset);
router.post(
  "/changePassword",
  [body("newPassword").notEmpty()],
  changePassword
); // this is for changing password after user receieves reset password and not in profile

router.get("/authorize", isAuth, (req, res) => {
  res.status(200).json();
});

module.exports = router;
