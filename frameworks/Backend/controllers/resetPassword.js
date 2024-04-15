const crypto = require('crypto');
const Requester = require('../models/requester.model');
const { sendResetEmail, sendEmail } = require('../common/sendEmail');

handleReset =  async (req, res) => {
    crypto.randomBytes(32, async (err, buffer) =>{
        try {
            if (err) 
                throw new Error("Error generating reset token: " + err.message);
            
            const token = buffer.toString('hex');
            const user = await Requester.findOne({ email: req.body.email });
    
            if (!user) 
                throw new Error("User not found");
            
    
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;
            await user.save();
            sendResetEmail(req.body.email, token);
    
            res.status(200).json({
                message: "Reset token sent successfully"
            });
        } catch (error) {
            console.error("Error in reset password:", error);
    
            res.status(500).json({
                message: "An error occurred while processing your request",
                error: error.message
            });
        }
    });
}

module.exports = {
    handleReset
};