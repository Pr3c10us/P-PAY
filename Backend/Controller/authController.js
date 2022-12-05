const bcrypt = require('bcryptjs');
const User = require('../Models/authModel');
const jwt = require('jsonwebtoken');
const { UnauthorizedError, BadRequestError } = require('../Errors');
require('dotenv').config();

const signup = async (req, res) => {
    let { Password, Pin, Balance } = req.body;
    if (Balance) {
        throw new BadRequestError("Can't include Balance");
    }
    if (Pin.length !== 4) {
        throw new BadRequestError('Pin length must be 4');
    }
    if (!Password || !Pin) {
        throw new BadRequestError('Pin or Password has not been filled');
    }
    // Hash password and pin
    let salt = bcrypt.genSaltSync(10);
    req.body.Password = bcrypt.hashSync(Password, salt);
    req.body.Pin = bcrypt.hashSync(Pin, salt);

    // Create Account
    const user = await User.create(req.body);

    // Create Payload
    const payload = {
        username: user.Username,
        id: user._id,
    };
    //Create token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    //Send token through cookie
    res.cookie('token', token, {
        expires: new Date(Date.now() + 1000 * 60 * 60),
        signed: true,
    });

    // Send created message
    res.json({ msg: 'Account created' });
};

const login = async (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        throw new BadRequestError('Please provide email and password');
    }
    // Check if user exist
    const user = await User.findOne({
        $or: [{ Username: username }, { Email: username }],
    });
    if (!user) {
        throw new BadRequestError('User does not exist');
    }

    // check if password is correct
    const isPasswordCorrect = bcrypt.compareSync(password, user.Password);
    if (!isPasswordCorrect) {
        res.cookie('token', '', { expires: new Date(Date.now() + 1000) });
        throw new UnauthorizedError('Wrong Password');
    }
    // Create Payload
    const payload = {
        username: user.Username,
        id: user._id,
    };
    //Create token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    //Send token through cookie
    res.cookie('token', token, {
        expires: new Date(Date.now() + 1000 * 60 * 60),
        signed: true,
    });

    // Send created message
    res.json({ msg: 'Loged In' });
};

const logout = async (req, res) => {
    res.cookie('token', '', { expires: new Date(Date.now() + 1000) }).json({
        msg: 'Successfully Logged Out!!!',
    });
};

module.exports = {
    signup,
    login,
    logout,
};

// const demoProfile = {
//     "FIRST NAME": "John",
//     "LAST NAME": "Doe",
//     "EMAIL ADDRESS": "johndoe@gmail.com",
//     "PHONE NUMBER": "08012345678",
//     PASSWORD: "Password@1",
//     BVN: "12345678901",
//     "DATE OF BIRTH": "1990-01-01",
//     PIN: "1234",
// };
