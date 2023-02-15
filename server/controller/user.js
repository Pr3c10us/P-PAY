const {
    NotFoundError,
    BadRequestError,
    UnAuthorizedError,
} = require('../errors');
const { User } = require('../models/userDetails');
const forgotPasswordMail = require('../utils/forgotPasswordMail');
const jwt = require('jsonwebtoken');
const emailClient = require('../azure/emailClient');
const bcrypt = require('bcryptjs');

const emailVerified = async (req, res) => {
    const { email } = req.query;

    const user = await User.findOne({ email });

    if (!user) {
        throw new NotFoundError('User with this email address does not exist');
    }

    if (!user.emailVerified) {
        return res.json({ msg: false });
    }

    res.json({ msg: true });
};

const twoFactorVerified = async (req, res) => {
    const { email } = req.query;

    const user = await User.findOne({ email });

    if (!user) {
        throw new NotFoundError('User with this email address does not exist');
    }

    if (!user.twoFactorVerified) {
        return res.json({ msg: false });
    }

    res.json({ msg: true });
};

const forgotPassword = async (req, res) => {
    const { email } = req.query;

    // check if email is provided
    if (!email) {
        throw new BadRequestError('Provide Email address.');
    }

    // get user info
    const user = await User.findOne({ email });

    // check if email exist in db
    if (!user) {
        throw new NotFoundError(`User with this email address does not exist.`);
    }

    // create payload for jwt
    const payload = { id: user.id };
    // create token
    const token = jwt.sign(payload, process.env.JWT_TOKEN, {
        expiresIn: '10m',
    });

    // Send the verification code to the user's email address with html
    const emailMessage = {
        sender: 'P-PAY@4aee61a6-4270-459f-8b6e-febd4e48344d.azurecomm.net',
        content: {
            subject: 'P-PAY Reset Password',
            html: forgotPasswordMail(token, user.firstname),
        },
        recipients: {
            to: [
                {
                    email,
                },
            ],
        },
    };

    // send email
    const response = await emailClient.send(emailMessage);
    const messageId = response.messageId;
    if (messageId === null) {
        throw new Error();
    }

    const emailStatus = await emailClient.getSendStatus(messageId);

    if (emailStatus.status !== 'Queued') {
        throw new BadRequestError(
            'verification code failed to send. Check email and Try again.'
        );
    }

    res.json({
        msg: 'An email containing a link to reset your password has been sent to your mail.',
    });
};

const resetPassword = async (req, res) => {
    let { token, password } = req.body;
    if (!token || !password) {
        throw new BadRequestError('Please provide all values');
    }

    // hash password
    password = await bcrypt.hash(password, 10);

    try {
        // get id from token
        const { id } = jwt.verify(token, process.env.JWT_TOKEN);

        // get user data
        const user = await User.findById(id);

        // check if user exist in db
        if (!user) {
            throw new NotFoundError(
                `User with this email address does not exist.`
            );
        }

        user.password = password;
        await user.save();

        res.json({ msg: 'Password reset Successful.' });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new UnAuthorizedError('This link has expired try again.');
        }
        if (error.name === 'JsonWebTokenError') {
            throw new UnAuthorizedError('Unauthorized to perform action.');
        }
        throw new Error();
    }
};

module.exports = {
    emailVerified,
    twoFactorVerified,
    forgotPassword,
    resetPassword,
};
