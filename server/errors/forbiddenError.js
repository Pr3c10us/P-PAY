const CustomError = require('./customError');

class ForbiddenError extends CustomError {
    constructor(msg) {
        super(msg);
        this.status = 403;
    }
}

module.exports = ForbiddenError;
