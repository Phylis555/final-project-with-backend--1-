const express = require("express");

const{handleLogin,}=require('../controllers/authController');
const{createUser,}=require('../controllers/registerController')
const{handleReset, changePassword}=require('../controllers/resetPassword')
const { body } = require('express-validator');

const router=express.Router();

router.post("/login",[
    body('email').normalizeEmail().isEmail(),     
    ],handleLogin);
router.post("/register",[
    body('email').normalizeEmail().isEmail(),
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    body('contactNumber').trim().isMobilePhone('he-IL')       
    ],createUser);
router.post("/resetPassword", handleReset);
router.post("/changePassword", changePassword);

module.exports = router;
