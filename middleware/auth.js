const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();


module.exports = function (req, res, next) {
    //get the token from the header
    const token = req.header('x-auth-token');
    //check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
