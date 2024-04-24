const express = require("express");
const { donateToFund } = require("../controllers/donator/donateFund");
const { getAllFunds } = require("../controllers/fund/allFunds");
const isAuth = require('../middleware/verifyJWT');


const { createFund } = require("../controllers/fund/createFund");
const { deleteFund, removeFund } = require("../controllers/fund/deleteFund");
const { getFund, getFundByStatus } = require("../controllers/fund/getFund");
const { getOrganizationFunds, getFundByOrganizationAndStatus, getNFunds } = require("../controllers/fund/getOrganizationFunds");
const { updateFund } = require("../controllers/fund/updateFund");

const router = express.Router();

router.get("/", getAllFunds);
router.get("/:organizationId/limit/:limit", getNFunds);
router.get("/:id", getFund);
router.post("/donateFund/:id", isAuth, donateToFund);
router.post("/create", isAuth, createFund);
router.post("/update/:id", isAuth, updateFund);
router.delete("/delete/:id", isAuth, deleteFund);
router.post("/remove/:id", isAuth, removeFund);
router.get("/status/:status", getFundByStatus);
router.get("/:oranizationID/:fundID", getOrganizationFunds);
router.get("/:organizationID/status/:status", getFundByOrganizationAndStatus);

module.exports = router;