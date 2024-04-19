const express = require("express");
const isAuth = require("../middleware/verifyJWT")

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
router.post("/register", createOrganization);
router.get("/view", getAllOrganizations)
router.put("/update/:id", isAuth, updateOrganization)
router.put("/update/board/:id", isAuth, updateOrganizationBoard)
router.put("/update/changePassword/:id", isAuth, changePassword)
router.delete("/delete/:id", isAuth, deleteOrganization)
router.get("/:organizationID/latest/:limit", getNContributions)
router.get("/summary/:organizationID", isAuth, getDashboardSummary)
router.get("/contributionChart/:organizationID", isAuth, contributionChart)
router.get("/:organizationID/report/:month", isAuth, generateReport)

module.exports = router;
