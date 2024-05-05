const express = require("express");
const isAuth = require("../middleware/verifyJWT")
const { body } = require('express-validator');
const isCorrectUser = require('../middleware/verifyCorrectUser');



// const { validate } = require("../middleware/donationValidation");

const { createOrganization } = require("../controllers/organization/createOrganization");
const { getAllOrganizations } = require("../controllers/organization/allOrganizations");
const { updateOrganization, changePassword, updateOrganizationBoard } = require("../controllers/organization/updateOrganization");
const { getOrganization } = require("../controllers/organization/getOrganization");
const { deleteOrganization } = require("../controllers/organization/deleteOrganization");
const { getNContributions } = require("../controllers/organization/summary/latestContributions");
const { getDashboardSummary } = require("../controllers/organization/summary/dashboardSummary");
const { contributionChart } = require("../controllers/organization/summary/contributionChart");
const { generateReport } = require("../controllers/organization/summary/generateReport");

const router = express.Router();

router.get("/", getAllOrganizations)
router.get("/:id", getOrganization)
router.post("/register", [
    body('name').trim().notEmpty(),
    body('country').trim().notEmpty(),
    body('contactNumber').trim().isMobilePhone('he-IL'),
    body('email').trim().normalizeEmail().isEmail().withMessage("Not a legal email"),
    body('presidentName').trim().notEmpty(),
    body('presidentContactNumber').trim().isMobilePhone('he-IL'),
    body('presidentEmail').trim().normalizeEmail().isEmail().withMessage("Not a legal email"),
    body('secretaryName').trim().notEmpty(),
    body('secretaryContactNumber').trim().isMobilePhone('he-IL'),
    body('secretaryEmail').trim().normalizeEmail().isEmail().withMessage("Not a legal email"),
  ], createOrganization);
router.get("/view", getAllOrganizations)
router.put("/update/:id", isAuth, isCorrectUser, updateOrganization)
router.put("/update/board/:id", isAuth, isCorrectUser, updateOrganizationBoard)
router.put("/update/changePassword/:id", isAuth, isCorrectUser,  changePassword)
router.delete("/delete/:id", isAuth, isCorrectUser, deleteOrganization)
router.get("/:organizationID/latest/:limit", getNContributions)
router.get("/summary/:organizationID", isAuth, isCorrectUser, getDashboardSummary)
router.get("/contributionChart/:organizationID", isAuth, isCorrectUser, contributionChart)
router.get("/:organizationID/report/:month", isAuth, isCorrectUser, generateReport)

module.exports = router;
