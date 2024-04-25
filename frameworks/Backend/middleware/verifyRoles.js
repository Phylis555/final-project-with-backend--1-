const { admin } = require('../config/roles_list')

module.exports = (req, res, next) => {
    if(req.role !== admin){
        const error = new Error('Not Admin.');
        error.statusCode = 401;
        throw error;
    }

    next();
};