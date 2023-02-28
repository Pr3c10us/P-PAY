const router = require('express').Router();
const {
    checkDuplicate,
    signup,
    sendCode,
    verifyCode,
    login,
    logout,
} = require('../controller/authentication');

router.route('/signup').post(signup);

router.route('/login').post(login);

router.route('/logout').get(logout);

router.route('/check').get(checkDuplicate);

router.route('/sendCode').get(sendCode);

router.route('/verifyCode').get(verifyCode);

module.exports = router;
