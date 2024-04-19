const express = require("express");
const isAuth = require('../../middleware/verifyJWT')

const{handleLogin,}=require('../controllers/authController');
const{createUser,}=require('../controllers/registerController')
const{handleReset, changePassword}=require('../controllers/resetPassword')
const { body } = require('express-validator');

const router=express.Router();

router.post("/login",handleLogin);
router.post("/register",[
    body('email').isEmail(),
    body('password').isLength({min:6}, {max:20}),//can add more logic later
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    body('contactNumber').trim().isMobilePhone('he-IL')       
    ],createUser);
router.post("/resetPassword", handleReset);
router.post("/changePassword", isAuth, changePassword);

module.exports = router;
