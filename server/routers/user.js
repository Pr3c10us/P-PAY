const {
    emailVerified,
    twoFactorVerified,
    forgotPassword,
    resetPassword,
    pin,
    userDetails,
    getUser,
    checkPin,
} = require('../controller/user');
const authorize = require('../middleware/authorization');

const router = require('express').Router();

router.route('/userDetails').get(authorize, userDetails);
router.route('/emailVerified').get(emailVerified);
router.route('/twoFactorVerified').get(twoFactorVerified);
router.route('/forgotPassword').get(forgotPassword);
router.route('/resetPassword').post(resetPassword);
router.route('/pin').put(authorize, pin);
router.route('/checkPin').get(authorize, checkPin);
router.route('/:username').get(getUser);

module.exports = router;
