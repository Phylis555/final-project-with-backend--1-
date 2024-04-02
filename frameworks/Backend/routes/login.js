const express = require("express");

const{handleLogin,}=require('../controllers/authController');
const{createUser,}=require('../controllers/registerController')
const { body } = require('express-validator');

const router=express.Router();

router.post("/login",handleLogin)
router.post("/register",[
    body('email').isEmail(),
    body('password').isLength({min:6}, {max:20}),//can add more logic later
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    body('contactNumber').trim().isMobilePhone('he-IL')       
    ],createUser)

module.exports = router;
