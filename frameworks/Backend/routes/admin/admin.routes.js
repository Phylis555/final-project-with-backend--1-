const express = require("express");
const verifyJWT = require("../../middleware/verifyJWT")
const isAuth = require('../../middleware/verifyJWT')
const isAdmin = require('../../middleware/verifyRoles')


const {getRequestedOrganizations}=require("../../controllers/admin/requestedOrganization");
const {getApprovedOrganizations}=require("../../controllers/admin/approvedOrganization");
const {deleteReqOrganization}=require("../../controllers/admin/deleteReqOrg")
const {getOneOrganizationDetails}=require("../../controllers/admin/oneOrganizationiDetails");
const {getRequestedFunds}=require("../../controllers/admin/fundlist");
const{getApprovedFunds}=require("../../controllers/admin/fundlist");
const{editOrganization}=require("../../controllers/admin/updateOrg");
const{updateDonationStatus}=require("../../controllers/admin/updateDonationStatus");
const{getAllPendingDonations}=require("../../controllers/admin/pendingDonationList");
const { getAllUsers } = require("../../controllers/admin/getAllUsers");
const { getAllAcceptedDonations } = require("../../controllers/admin/acceptedDonationList");
const { editOrganizationStatus } = require("../../controllers/admin/updateOrgStatus");
const { updateFundStatus } = require("../../controllers/admin/updateFundStatus");
const { deleteDonationRequest } = require("../../controllers/admin/deleteDonationRequest");
const { rejectDonation } = require("../../controllers/admin/rejectDonation");
const { deleteUser } = require("../../controllers/admin/deleteUser");

const router = express.Router();

router.get("/reqorglist", isAuth, isAdmin, getRequestedOrganizations);
router.get("/approvedorg", isAuth,isAdmin, getApprovedOrganizations);
router.get("/vieworg/:id", isAuth, isAdmin,getOneOrganizationDetails);
router.get("/reqfunds", isAuth, isAdmin,getRequestedFunds);
router.get("/approvedfunds", isAuth, isAdmin,getApprovedFunds);
router.delete("/deletereqorg/:id", isAuth, isAdmin,deleteReqOrganization);
router.put("/editorg/:id", isAuth, isAdmin,editOrganization);
router.put("/uporgstatus/:id", isAuth, isAdmin,editOrganizationStatus);
router.put("/upfundstatus/:id", isAuth, isAdmin,updateFundStatus);
router.put("/updostauts/:id", isAuth, isAdmin,updateDonationStatus);
router.get("/getpdon/", isAuth, isAdmin,getAllPendingDonations);
router.get("/getaccepteddon/", isAuth, isAdmin,getAllAcceptedDonations);
router.get("/getusers", isAuth, isAdmin,getAllUsers);
router.delete("/deletedonreq/:id", isAuth, isAdmin,deleteDonationRequest);
router.put("/rejectdonation/:id", isAuth, isAdmin,rejectDonation);
router.delete("/deleteuser/:id", isAuth, isAdmin,deleteUser);




module.exports = router;
