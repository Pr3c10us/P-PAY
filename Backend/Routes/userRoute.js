const {
    getUser,
    deleteUser,
    editUser,
    updatePassword,
    updatePin,
} = require('../Controller/userController');
const { authorization } = require('../Middleware/authorization');

const router = require('express').Router();

router
    .route('/user')
    .get(authorization, getUser)
    .delete(authorization, deleteUser)
    .patch(authorization, editUser);

router.route('/updatePassword').patch(authorization, updatePassword);
router.route('/updatePin').patch(authorization, updatePin);

module.exports = router;
