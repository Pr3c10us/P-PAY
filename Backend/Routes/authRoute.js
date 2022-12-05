const { signup, login,logout } = require('../Controller/authController');

const router = require('express').Router();

// Route for sign up

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout);

module.exports = router;
