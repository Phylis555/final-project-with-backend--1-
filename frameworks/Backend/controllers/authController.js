const User = require('../models/user');
const Organization=require('../models/organization.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Requester = require('../models/requester.model');
const { validationResult } = require('express-validator/check');


const handleLogin = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(422).json({message: 'Validation failed.', error : errors.array()});
    }
    console.log("PASSEDDD")
    // console.log(req.body)
    const { username, password, email } = req.body;
    console.log(email);
    let foundUser;
    if ((!username||!email)&&!password) return res.status(400).json({ 'message': 'Username and password are required.' });

    foundUser = await Requester.findOne({ email: email }).exec();
    if (!foundUser){
        foundUser = await Organization.findOne({email: email }).exec();
    } 
    if(!foundUser){
        return res.sendStatus(401); //Unauthorized 
    }
    console.log(foundUser)
    //console.log(foundUser)
    
    
    // const foundUser = await User.findOne({ username: email }).exec();
    // if(username){
    //     console.log(username)
    //     foundUser = await User.findOne({ username: username }).exec();
    //     console.log("username",foundUser)
        
        

    // } else if (email){
    //     foundUser = await Organization.findOne({username: email }).exec();
    //     console.log("email",foundUser)
        
        
    // }
    // const foundUser1 = await User.findOne({ username: username }).exec();
    // console.log(foundUser)
    // const foundUser= await Organization.findOne({email:username}).exec();
    // console.log(foundUser1)
    
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    
    // const match = (password==foundUser.password);
    console.log(foundUser)
    const match1=await bcrypt.compare(password,foundUser.password);
    
    console.log(password)
    console.log(foundUser.password)
    console.log(match);

    if (match) {
        const roles = foundUser.roles;
        const _id=(foundUser._id);
        
        console.log("PASSED1");
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "roles": roles,
                    "_id":_id
                }
            },
            'my_hard_coded_secret',
            { expiresIn: '1h' }
        );
        console.log("PASSED2");
        const refreshToken = jwt.sign(
            { "_id": _id },
            'my_hard_coded_refresh_secret',
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        console.log(roles);
        console.log(_id)

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ roles, accessToken,_id });
        console.log(accessToken);
        }
    // } else if(match1) {
    //     console.log("PASSED2");
    //     const roles = Object.values(foundUser.roles).filter(Boolean);
    //     // create JWTs
    //     const accessToken = jwt.sign(
    //         {
    //             "UserInfo": {
    //                 "username": foundUser.email,
    //                 "roles": roles
    //             }
    //         },
    //         process.env.ACCESS_TOKEN_SECRET,
    //         { expiresIn: '1h' }
    //     );
    //     const refreshToken = jwt.sign(
    //         { "username": foundUser1.email },
    //         process.env.REFRESH_TOKEN_SECRET,
    //         { expiresIn: '1d' }
    //     );
    //     // Saving refreshToken with current user
    //     foundUser1.refreshToken = refreshToken;
    //     const result = await foundUser1.save();
    //     console.log(result);
    //     console.log(roles);

    //     // Creates Secure Cookie with refresh token
    //     res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

    //     // Send authorization roles and access token to user
    //     res.json({ roles, accessToken });
        
    // }
        else{
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };