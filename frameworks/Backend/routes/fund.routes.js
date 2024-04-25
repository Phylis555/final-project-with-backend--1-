const express = require("express");
const { donateToFund } = require("../controllers/donator/donateFund");
const { getAllFunds } = require("../controllers/fund/allFunds");
const isAuth = require('../middleware/verifyJWT');
const { body } = require('express-validator');



const { createFund } = require("../controllers/fund/createFund");
const { deleteFund, removeFund } = require("../controllers/fund/deleteFund");
const { getFund, getFundByStatus } = require("../controllers/fund/getFund");
const { getOrganizationFunds, getFundByOrganizationAndStatus, getNFunds } = require("../controllers/fund/getOrganizationFunds");
const { updateFund } = require("../controllers/fund/updateFund");

const router = express.Router();

router.get("/", getAllFunds);
router.get("/:organizationId/limit/:limit", getNFunds);
router.get("/:id", getFund);
router.post("/donateFund/:id", [
    body('amount').isNumeric(),      
    ],isAuth, donateToFund);
router.post("/create", [
    body('title').trim().isLength({min : 3}),
    body('target').trim().isLength({min : 10}),      
    body('description').trim().isLength({min : 10}),
    body('endingDate').isISO8601().custom((value, {req}) => {
        return new Date(req.body.endingDate) > Date.now();
    }),
    body('contactEmail').trim().normalizeEmail().isEmail().withMessage("Not a legal email"),
    body('budget').isNumeric(),      
    body('contactNumber').trim().isMobilePhone('he-IL'),
    ],isAuth, createFund);
router.post("/update/:id", [
    body('title').trim().isLength({min : 3}),
    body('target').trim().isLength({min : 10}),      
    body('description').trim().isLength({min : 10}),
    body('endingDate').isISO8601().custom((value, {req}) => {
        return new Date(req.body.endingDate) > Date.now();
    }),
    body('budget').isNumeric(),      
    ], isAuth, updateFund);
router.delete("/delete/:id", isAuth, deleteFund);
router.post("/remove/:id", isAuth, removeFund);
router.get("/status/:status", getFundByStatus);
router.get("/:oranizationID/:fundID", getOrganizationFunds);
router.get("/:organizationID/status/:status", getFundByOrganizationAndStatus);

module.exports = router;