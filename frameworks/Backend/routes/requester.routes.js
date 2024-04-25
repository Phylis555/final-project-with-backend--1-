const express = require("express");
const isAuth = require('../middleware/verifyJWT');

const { createRequest } = require("../controllers/requester/CreateRequest");
const { requesterSignUp } = require("../controllers/requester/RequesterSignup");
const { viewUserProfile } = require("../controllers/requester/ViewProfile");
const { updateProfile, updatePassword } = require("../controllers/requester/UpdateProfile");
const { getAllRequests } = require("../controllers/request/allRequests");
const { getRequestersRequest } = require("../controllers/request/viewRequest");
const { getMyRequests } = require("../controllers/request/viewMyRequests");
const { deleteRequest } = require("../controllers/request/deleteRequest");
const { body } = require('express-validator');


const router = express.Router();

router.post("/requesterSignUp",[
    body('email').normalizeEmail().isEmail(),
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    body('contactNumber').trim().isMobilePhone('he-IL')       
    ],requesterSignUp);
router.post("/createRequest", [
    body('donationTitle').trim().isLength({min : 5}).withMessage('Title too short'),
    body('email').trim().normalizeEmail().isEmail().withMessage("Not a legal email"),
    body('donationEndDate').isDate().custom((value, {req}) => {
        return validator.isAfter(inputDate, currentDate.toISOString());
    },)
], isAuth, createRequest);
router.get("/profile/:id", isAuth, viewUserProfile);
router.post("/updateProfile/:id", [
    body('email').normalizeEmail().isEmail(),
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    body('contactNumber').trim().isMobilePhone('he-IL')       
    ],isAuth, updateProfile);
router.post("/updatePassword/:id", isAuth, updatePassword);
router.get("/view/request/:id", isAuth, getRequestersRequest);
router.get("/my/requests/:id", isAuth, getMyRequests);
router.get("/allrequests", getAllRequests);
router.delete("/delete/:id", isAuth, deleteRequest);

//.normalizeEmail()

module.exports = router;
