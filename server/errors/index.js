const CustomError = require('./customError');
const BadRequestError = require('./badReqError');
const UnAuthorizedError = require('./unAuthError');
const ForbiddenError = require('./forbiddenError');
const NotFoundError = require('./notFoundErr.js');

module.exports = {
    BadRequestError,
    CustomError,
    UnAuthorizedError,
    ForbiddenError,
    NotFoundError,
};
