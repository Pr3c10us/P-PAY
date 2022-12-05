const { getUser, deleteUser, editUser } = require('../Controller/userController')

const router = require('express').Router()

router.route('/getUser').get()