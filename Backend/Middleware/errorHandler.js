const { CustomError } = require('../Errors');

const errorHandler = (error, req, res, next) => {
    // if error is a custom error
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ msg: error.message });
    }

    // if error is a ValidationError respond with BadReqErr and error message
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            msg: Object.values(error.errors).map((val) => val.message),
        });
    }

    // if error code is 11000 respond with BadReqErr and error message
    if (error.code === 11000) {
        return res.status(400).json({
            msg: `Duplicate value entered for ${Object.keys(
                error.keyValue
            )} field, please choose another value`,
        });
    }

    console.log(error);
    return res.status(500).json({ msg: 'Internal Error' });
};

module.exports = errorHandler;
