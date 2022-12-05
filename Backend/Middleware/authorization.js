// Import dependencies
require('dotenv').config();
const { UnauthorizedError, BadRequestError } = require('../Errors');
const jwt = require('jsonwebtoken');

//Create autorize middleware
const authorization = async (req, res, next) => {
    // Check if token is present
    const { token } = req.signedCookies;
    // Check if token is present
    if (!token) {
        throw new UnauthorizedError('Authentication Invalid');
    }

    try {
        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.id, username: decoded.username };
        next();
    } catch (error) {
        throw new UnauthorizedError('Authentication Invalid');
    }
};

module.exports = {
    authorization,
};
