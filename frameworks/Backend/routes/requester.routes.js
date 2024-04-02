const express = require("express");

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
    body('email').isEmail(),
    body('password').isLength({min:6}, {max:20}),//can add more logic later
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    body('contactNumber').trim().isMobilePhone('he-IL')       
    ],requesterSignUp);
router.post("/createRequest", [
    body('donationTitle').trim().isLength({min : 5}).withMessage('Title too short'),
    body('email').trim().isEmail().withMessage("Not a legal email"),
    body('donationEndDate').isDate().custom((value, {req}) => {
        return validator.isAfter(inputDate, currentDate.toISOString());
    })
],createRequest);
router.get("/profile/:id", viewUserProfile);
router.put("/updateProfile/:id", updateProfile);
router.put("/updatePassword/:id", updatePassword);
router.get("/view/request/:id", getRequestersRequest);
router.get("/my/requests/:id", getMyRequests);
router.get("/allrequests", getAllRequests);
router.delete("/delete/:id" ,deleteRequest);

module.exports = router;
