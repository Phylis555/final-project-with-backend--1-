const crypto = require('crypto');
const Requester = require('../models/requester.model');
const { sendResetEmail, sendEmail } = require('../common/sendEmail');

const bcrypt = require("bcrypt");
const saltRounds = 10; // For hashing passwords

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

changePassword = async (req, res) => {
    try {
        const newPassword = req.body.password;
        const passwordToken = req.body.token;
        let user = await Requester.findOne({ resetToken: passwordToken });

        if(Date.now() > Date(user.resetTokenExpiration))
            throw new Error('Invalid or expired token');

        if (!user) {
            throw new Error('Invalid or expired token');
        }

        const saltRounds = 10; // Example salt rounds
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds); // hash the password
        user.password = hashedPassword;
        // user.resetToken = null;
        // user.resetTokenExpiration = undefined;
        await user.save();

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);

        let statusCode = 500;
        let errorMessage = 'Internal Server Error';

        if (error.message === 'Invalid or expired token') {
            statusCode = 400;
            errorMessage = 'Invalid or expired token';
        }

        return res.status(statusCode).json({ message: errorMessage });
    }
}


module.exports = {
    handleReset,
    changePassword
};