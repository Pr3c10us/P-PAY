const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
    },
    dob: {
        type: String,
    },
    pin: {
        type: String,
    },
    balance: {
        type: Number,
        default: 0,
    },
    otp: {
        type: Array,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    twoFactorVerified: {
        type: Boolean,
        default: false,
    },
    totalSpent: {
        type: Number,
        default: 0,
    },
    totalReceived: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
