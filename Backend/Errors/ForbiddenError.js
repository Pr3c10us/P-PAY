const { StatusCodes } = require('http-status-codes');
const CustomError = require('./customError');

class ForbiddenError extends CustomError {
    constructor(msg) {
        super(msg);
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}

module.exports = ForbiddenError;
