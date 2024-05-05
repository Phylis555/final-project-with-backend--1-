const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    // console.log(authHeader);
    if(!authHeader){
        const error = new Error('Not Authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];

    try {
    decodedToken = jwt.verify(
            token,
            'my_hard_coded_secret'
        );
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    if(!decodedToken){
        const error = new Error('Not Authenticated');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.UserInfo.userId;
    req.role = decodedToken.UserInfo.roles;

    console.log("Authentication succeed");

    next();
};
