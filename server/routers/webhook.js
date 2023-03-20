const Webhook = require('../controller/webhook');

const router = require('express').Router();

router.route('/').post(Webhook);

module.exports = router;
