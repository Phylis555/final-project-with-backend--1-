const express = require("express");
const verifyJWT = require("../../middleware/verifyJWT")
const isAuth = require('../../middleware/verifyJWT')

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

router.get("/reqorglist", isAuth, getRequestedOrganizations);
router.get("/approvedorg", isAuth, getApprovedOrganizations);
router.get("/vieworg/:id", isAuth, getOneOrganizationDetails);
router.get("/reqfunds", isAuth, getRequestedFunds);
router.get("/approvedfunds", isAuth, getApprovedFunds);
router.delete("/deletereqorg/:id", isAuth, deleteReqOrganization);
router.put("/editorg/:id", isAuth, editOrganization);
router.put("/uporgstatus/:id", isAuth, editOrganizationStatus);
router.put("/upfundstatus/:id", isAuth, updateFundStatus);
router.put("/updostauts/:id", isAuth, updateDonationStatus);
router.get("/getpdon/", isAuth, getAllPendingDonations);
router.get("/getaccepteddon/", isAuth, getAllAcceptedDonations);
router.get("/getusers", isAuth, getAllUsers);
router.delete("/deletedonreq/:id", isAuth, deleteDonationRequest);
router.put("/rejectdonation/:id", isAuth, rejectDonation);
router.delete("/deleteuser/:id", isAuth, deleteUser);




module.exports = router;
