// import mongoose
const mongoose = require('mongoose');

// create mongoose schema
const userSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: [true, 'Please Provide your first name'],
        min: [1, 'Name must be more that 1 character '],
        max: [30, 'Name must be lower than 30 characters'],
    },
    Lastname: {
        type: String,
        required: [true, 'Please Provide your last name'],
        min: [1, 'Name must be more that 1 character '],
        max: [30, 'Name must be lower than 30 characters'],
    },
    Username: {
        type: String,
        required: [true, 'Please Provide a Username'],
        min: [1, 'Name must be more that 1 character '],
        max: [30, 'Name must be lower than 30 characters'],
        unique: [true, 'Username taken'],
    },
    Email: {
        type: String,
        required: [true, 'Please Provide your email address'],
        unique: [true, 'Email already exists'],
    },
    Phonenumber: {
        type: String,
        required: [true, 'Please Provide your phone number'],
        min: [11, 'Phone number must be at least 11 characters'],
        max: [11, 'Phone number must be less than 11 characters'],
        unique: [true, 'PHONE NUMBER EXIST'],
    },
    Password: {
        type: String,
        required: [true, 'Please Provide your Password'],
        // match: [
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        //     'Password must have Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
        // ],
    },
    Country: {
        type: String,
        default: 'Nigeria',
    },
    BVN: {
        type: String,
        required: [true, 'Please Provide your BVN'],
        unique: [true, 'BVN ALREADY IN USE'],
    },
    DOB: {
        type: Date,
        required: [true, 'Please Provide your date of birth'],
    },
    Pin: {
        type: String,
        required: [true, 'Please Provide pin'],
        min: [4, 'Pin must be 4 characters'],
        max: [4, 'Pin must be 4 characters'],
    },
    Balance: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('User', userSchema);
