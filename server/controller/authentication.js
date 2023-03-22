const { BadRequestError, ForbiddenError, NotFoundError } = require('../errors');
const { User } = require('../models/userDetails');
const bcrypt = require('bcryptjs');
const emailClient = require('../azure/emailClient');
const verificationMail = require('../utils/verificationMail');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const checkDuplicate = async (req, res) => {
    const { email, username } = req.query;

    if (email) {
        // check if email exist in db
        const exist = await User.findOne({
            email,
        });

        if (exist) {
            throw new BadRequestError('Email already exists, Try another');
        }
        return res.status(200).json({ msg: 'clear' });
    }

    if (username) {
        // check if username exist in db
        const exist = await User.findOne({
            username,
        });

        if (exist) {
            throw new BadRequestError(
                'The username is already taken, try another'
            );
        }
        return res.status(200).json({ msg: 'clear' });
    }

    res.send('clear');
};

const signup = async (req, res) => {
    // check if balance field is filled
    if (req.body.balance || req.body.emailVerified) {
        throw new ForbiddenError('Forbidden field - Balance');
    }

    // hash password and pin
    req.body.password = await bcrypt.hash(req.body.password, 10);

    // Generate a random 6-digit verification code and add too body
    let code = Math.floor(Math.random() * 900000) + 100000;
    code = code.toString();
    // Set the expiration time to 10 minutes from now
    const expiration = Date.now() + 1000 * 60 * 10;

    // create otp in body
    const otp = [code, expiration];

    // update db with email provide and insert otp
    req.body.otp = otp;

    // Send the verification code to the user's email address with html
    const emailMessage = {
        sender: 'P-PAY@4aee61a6-4270-459f-8b6e-febd4e48344d.azurecomm.net',
        content: {
            subject: 'P-PAY Verification Code',
            html: verificationMail(code, req.body.email, 'emailVerification'),
        },
        recipients: {
            to: [
                {
                    email: req.body.email,
                },
            ],
        },
    };

    // send email
    await sendEmail(emailMessage);

    // create user
    await User.create(req.body);

    res.status(200).json({
        msg: 'Created',
    });
};

const sendCode = async (req, res) => {
    // get email from query
    const { email, resend, authRoute } = req.query;
    // check if email is provided
    if (!email) {
        throw new BadRequestError('Please provide a valid email address');
    }
    if (!authRoute) {
        throw new BadRequestError('Please provide a valid authRoute');
    }

    // check if user exist
    const user = await User.findOne({ email });
    if (!user) {
        throw new NotFoundError(`User with this email address does not exist.`);
    }
    if (user.otp[0] && (resend == 'no' || !resend)) {
        return res.json({ msg: 'Sent already' });
    }

    // Generate a random 6-digit verification code and add too body
    let code = Math.floor(Math.random() * 900000) + 100000;
    code = code.toString();
    // Set the expiration time to 10 minutes from now
    const expiration = Date.now() + 1000 * 60 * 10;

    // create otp in body
    const otp = [code, expiration];
    // update db with email provide and insert otp
    user.otp = otp;
    await user.save();

    // Send the verification code to the user's email address with html
    const emailMessage = {
        sender: 'P-PAY@4aee61a6-4270-459f-8b6e-febd4e48344d.azurecomm.net',
        content: {
            subject: 'P-PAY Verification Code',
            html: verificationMail(code, email, authRoute),
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
    await sendEmail(emailMessage);

    res.json({ msg: 'sent' });
};

const verifyCode = async (req, res) => {
    const { code, email } = req.query;

    // check if they provided all values
    if (!email || !code) {
        throw new BadRequestError(
            'Please provide a valid email address and otp code'
        );
    }

    // get user info
    const user = await User.findOne({ email });
    // check if user exist in db
    if (!user) {
        throw new NotFoundError(`User with this email address does not exist.`);
    }

    // Check if the code is correct
    if (code !== user.otp[0]) {
        throw new BadRequestError('The code provided is incorrect');
    }
    // Check if the code has expired
    if (Date.now() > user.otp[1]) {
        throw new BadRequestError('Code has expired, Request a new one');
    }

    // if email is unverified change to verified
    if (!user.emailVerified) {
        user.emailVerified = true;
    }
    // if two factor auth is unverified change to verified
    if (!user.twoFactorVerified) {
        user.twoFactorVerified = true;
    }
    // Save updates
    await user.save();

    res.json({
        msg: 'The code you entered is correct',
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    // Check if email and password are provided
    if (!email || !password) {
        throw new BadRequestError('Please provide your email and password');
    }

    // get user info of provided email
    const user = await User.findOne({ email });

    // check if user exist
    if (!user) {
        throw new NotFoundError('User with email address does not exist');
    }

    // check if password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new BadRequestError('The password you entered is incorrect');
    }

    // Make twoFactorVerified false
    user.twoFactorVerified = false;
    await user.save();

    // create payload for jwt
    const payload = { id: user.id };

    const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: '1d' });

    res.cookie('token', token, {
        signed: true,
        maxAge: 1000 * 60 * 60 * 24,
        // httpOnly: false,
        secure: true,
    }).json({
        msg: 'Login Successful',
    });
};

const logout = async (req, res) => {
    res.cookie('token', '', {
        expires: new Date(Date.now() + 1000),
    }).json({ msg: 'Successfully Logged Out!!!' });
};

module.exports = {
    checkDuplicate,
    signup,
    sendCode,
    verifyCode,
    login,
    logout,
};
