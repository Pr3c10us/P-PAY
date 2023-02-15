const {
    emailVerified,
    twoFactorVerified,
    forgotPassword,
    resetPassword,
} = require('../controller/user');

const router = require('express').Router();

router.route('/emailVerified').get(emailVerified);
router.route('/twoFactorVerified').get(twoFactorVerified);
router.route('/forgotPassword').get(forgotPassword);
router.route('/resetPassword').post(resetPassword);

module.exports = router;
