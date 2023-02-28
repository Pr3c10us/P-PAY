const {
    emailVerified,
    twoFactorVerified,
    forgotPassword,
    resetPassword,
    pin,
    userDetails,
} = require('../controller/user');
const authorize = require('../middleware/authorization');

const router = require('express').Router();

router.route('/userDetails').get(authorize, userDetails);
router.route('/emailVerified').get(emailVerified);
router.route('/twoFactorVerified').get(twoFactorVerified);
router.route('/forgotPassword').get(forgotPassword);
router.route('/resetPassword').post(resetPassword);
router.route('/pin').put(authorize, pin);

module.exports = router;
