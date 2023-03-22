require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UnAuthorizedError, NotFoundError } = require('../errors');
const { User } = require('../models/userDetails');

const authorize = async (req, res, next) => {
    const { token } = req.signedCookies;

    if (!token) {
        console.log(token);
        throw new UnAuthorizedError('Log in');
    }

    try {
        const { id } = await jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findById(id);
        if (!user) {
            throw new NotFoundError('user does not exist');
        }

        req.user = { id };
        next();
    } catch (error) {
        throw new UnAuthorizedError('Authorization failed Log back in');
    }
};

module.exports = authorize;
