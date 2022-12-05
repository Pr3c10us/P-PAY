// Import dependencies
const {
    BadRequestError,
    ForbiddenError,
    UnauthorizedError,
} = require('../Errors');
const { findByIdAndUpdate } = require('../Models/authModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/authModel');

const getUser = async (req, res) => {
    const { userId } = req.user;

    //Get user from database
    const user = await User.findById(userId);
    //check if user Exist
    if (!user) {
        throw new BadRequestError('User does not exist');
    }

    res.json(user);
};

const deleteUser = async (req, res) => {
    const { userId } = req.user;

    //check if user Exist
    const user = await User.findById(userId);
    if (!user) {
        throw new BadRequestError('User does not exist');
    }

    //Prevent user from deleting account if account balance is less than 0
    if (user.Balance < 0) {
        throw new ForbiddenError(
            "Account can't be deleted, cash is owed, Payup"
        );
    }
    //Prevent user from deleting account if account balance is more than 0
    if (user.Balance > 0) {
        throw new ForbiddenError(
            "Account can't be deleted, cash is still available,Transfer funds to another Bank acount"
        );
    }

    //Delete user
    await User.findByIdAndDelete(userId);

    res.cookie('token', '', { expires: new Date(Date.now() + 1000) }).json({
        msg: 'Account Deleted',
    });
};

const editUser = async (req, res) => {
    const { userId } = req.user;

    const { Password, Country, BVN, Pin, Balance } = req.body;
    if ((Password, Country, BVN, Pin, Balance)) {
        throw new ForbiddenError("forbidden fields can't be edited");
    }
    // Update user with Id in cookie
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        returnDocument: 'after',
    });

    const payload = {
        username: updatedUser.Username,
        id: updatedUser._id,
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
    res.json({ msg: 'Edit User', updatedUser });
};

const updatePassword = async (req, res) => {
    //get user id
    const { userId } = req.user;
    //Get old and new password
    let { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new BadRequestError('Input all field');
    }

    //Get user details
    const user = await User.findById(userId);

    //Check if oldPassword matches the user password
    const isPasswordCorrect = bcrypt.compareSync(oldPassword, user.Password);
    if (!isPasswordCorrect) {
        throw new UnauthorizedError('Old Password Wrong');
    }

    // Encrypt new Password
    const salt = bcrypt.genSaltSync(10);
    newPassword = bcrypt.hashSync(newPassword, salt);

    // update Password
    user.Password = newPassword;
    user.save();

    res.json({ msg: 'Password Updated' });
};

const updatePin = async (req, res) => {
    //get user id
    const { userId } = req.user;
    //Get old and new password
    let { oldPin, newPin } = req.body;

    if (!oldPin || !newPin) {
        throw new BadRequestError('Input all field');
    }
    if (oldPin.length !== 4 || newPin.length !== 4) {
        throw new BadRequestError('Pin length must be 4');
    }
    //Get user details
    const user = await User.findById(userId);

    //Check if oldPin matches the user Pin
    const isPinCorrect = bcrypt.compareSync(oldPin, user.Pin);
    if (!isPinCorrect) {
        throw new UnauthorizedError('Old Pin Wrong');
    }

    // Encrypt new Pin
    const salt = bcrypt.genSaltSync(10);
    newPin = bcrypt.hashSync(newPin, salt);

    // update Pin
    user.Pin = newPin;
    user.save();

    res.json({ msg: 'Pin Updated' });
};

module.exports = {
    getUser,
    deleteUser,
    editUser,
    updatePassword,
    updatePin,
};
