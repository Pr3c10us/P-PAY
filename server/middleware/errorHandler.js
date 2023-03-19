const { CustomError } = require('../errors');

const errHandler = async (error, req, res, next) => {
    console.log(error);

    if (error instanceof CustomError) {
        return res.status(error.status).json({ msg: error.message });
    }
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            msg: Object.values(error.errors).map((val) => val.message),
        });
    }
    if (error.code === 'ERR_BAD_REQUEST') {
        return res.status(400).json({
            msg: error.response.data.message,
        });
    }
    if (error.code === 11000) {
        return res.status(400).json({
            msg: ` ${Object.keys(error.keyValue)} Already Exists`,
        });
    }
    if (error.code === 'MessageNotFound' && error.name === 'RestError') {
        return res.status(404).json({
            msg: 'Failed to send otp. Recheck email provided and try again',
        });
    }
    return res.status(500).json({ msg: 'Internal Server Error' });
};

module.exports = errHandler;
