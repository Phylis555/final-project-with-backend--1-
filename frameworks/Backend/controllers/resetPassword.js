const crypto = require('crypto');
const Requester = require('../models/requester.model');

exports.handleReset =  (req, res, next) => {
    crpto.randomBytes(32, async (err, buffer) =>{
        if(err) {
            return res.status(500).json({
                message: "Error Reseting password",
                error: err
            })
        }
        const token = buffer.toString('hex');
        user = await Requester.findOne({email: req.body.email});
        if(!user){
            //throw... + res
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        await user.save();
        
    });
}