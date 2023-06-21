const {
    NotFoundError,
    BadRequestError,
    UnAuthorizedError,
} = require("../errors");
const { User } = require("../models/userDetails");
const Transaction = require("../models/transaction");
const forgotPasswordMail = require("../utils/forgotPasswordMail");
const jwt = require("jsonwebtoken");
const emailClient = require("../azure/emailClient");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const verificationMail = require("../utils/verificationMail");

const emailVerified = async (req, res) => {
    const { email } = req.query;

    const user = await User.findOne({ email });

    if (!user) {
        throw new NotFoundError("User with this email address does not exist");
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
        throw new NotFoundError("User with this email address does not exist");
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
        throw new BadRequestError("Provide Email address");
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
        expiresIn: "10m",
    });

    // Send the verification code to the user's email address with html
    const emailMessage = {
        sender: "Pr3c10us@4cca2dd7-9162-4872-978a-023dba99a0d0.azurecomm.net",
        content: {
            subject: "P-PAY Reset Password",
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

    if (emailStatus.status !== "Queued") {
        throw new BadRequestError(
            "verification code failed to send. Check email and Try again"
        );
    }

    res.json({
        msg: "An email containing a link to reset your password has been sent to your mail",
    });
};

const resetPassword = async (req, res) => {
    let { token, password } = req.body;
    if (!token || !password) {
        throw new BadRequestError("Please provide all values");
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

        // save user password
        user.password = password;
        await user.save();

        res.json({ msg: "Password reset Successful" });
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new UnAuthorizedError("This link has expired try again");
        }
        if (error.name === "JsonWebTokenError") {
            throw new UnAuthorizedError("Unauthorized to perform action");
        }
        throw new Error();
    }
};

const pin = async (req, res) => {
    let { pin, isNew } = req.query;

    const { id } = req.user;

    if (!pin) {
        throw new BadRequestError("Provide pin");
    }

    const user = await User.findById(id);
    if (isNew === "yes") {
        if (user.pin) {
            throw new BadRequestError("You Already have a pin");
        }
    }

    pin = await bcrypt.hash(pin, 10);

    user.pin = pin;
    await user.save();

    res.json({ msg: "Pin saved" });
};

const userDetails = async (req, res) => {
    const { id } = req.user;

    // get user info
    const user = await User.findById(id, "-otp -password -__v -dob");

    // return user details
    res.json({ user });
};

const getUser = async (req, res) => {
    const { username } = req.params;

    // get user info
    const user = await User.findOne(
        { username },
        "firstname lastname username -_id"
    );

    // check if user exist
    if (!user) {
        throw new NotFoundError("Account with this username does not exist");
    }

    // return user details
    res.json({ user });
};

const checkPin = async (req, res) => {
    const { pin } = req.query;

    const { id } = req.user;

    const user = await User.findById(id);

    const isMatch = await bcrypt.compareSync(pin, user.pin);

    if (!isMatch) {
        throw new BadRequestError("You have entered a wrong pin");
    }

    res.json({ msg: "Pin is correct" });
};

const editProfile = async (req, res) => {
    // get user username
    const { id } = req.user;

    // get info needed to be changed
    let { firstname, lastname, username } = req.body;
    // if (!firstname || !lastname || !username) {
    //     throw new BadRequestError('Provide all details');
    // }

    // get user info
    const user = await User.findById(id);

    if (username) {
        // check if username is taken
        const exist = await User.findOne({
            username,
        });

        if (exist) {
            throw new BadRequestError(
                "The username is already taken, try another"
            );
        }
        user.username = username;
    }
    if (firstname) {
        user.firstname = firstname;
    }

    if (lastname) {
        user.lastname = lastname;
    }

    // save changes
    await user.save();

    // update all transactions where user is involved
    await Transaction.updateMany(
        { sender: user.id },
        {
            senderUsername: username,
            senderFullName: `${firstname} ${lastname}`,
        }
    );
    await Transaction.updateMany(
        { receiver: user.id },
        {
            receiverUsername: username,
            receiverFullName: `${firstname} ${lastname}`,
        }
    );

    res.json({ msg: "Done" });
};
const changePassword = async (req, res) => {
    // get user id
    const { id } = req.user;

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new BadRequestError("oldPassword and newPassword are required");
    }

    // get user info
    const user = await User.findById(id);

    // decrypt with bcrypt and check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new BadRequestError("Old password is incorrect");
    }

    // hash new password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);

    // update password in the database
    user.password = password;
    await user.save();

    res.status(200).json({
        msg: "Password successfully changed",
    });
};

const changePin = async (req, res) => {
    // get user id
    const { id } = req.user;

    const { oldPin, newPin } = req.body;
    if (!oldPin || !newPin) {
        throw new BadRequestError("oldPin and newPin are required");
    }

    // get user info
    const user = await User.findById(id);

    // decrypt with bcrypt and check if old password is correct
    const isMatch = await bcrypt.compare(oldPin, user.pin);
    if (!isMatch) {
        throw new BadRequestError("Old pin is incorrect");
    }

    // hash new password
    const salt = await bcrypt.genSalt(10);
    const pin = await bcrypt.hash(newPin, salt);

    // update password in the database
    user.pin = pin;
    await user.save();

    res.status(200).json({
        msg: "Pin successfully changed",
    });
};
const isPinSet = async (req, res) => {
    // get user id
    const { id } = req.user;

    // get user info
    const user = await User.findById(id);

    if (user.pin) {
        return res.json({ pinSet: true });
    }

    res.json({ pinSet: false });
};

module.exports = {
    emailVerified,
    twoFactorVerified,
    forgotPassword,
    resetPassword,
    pin,
    userDetails,
    getUser,
    checkPin,
    editProfile,
    changePassword,
    changePin,
    isPinSet,
};
