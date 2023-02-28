const router = require('express').Router();
const { transfer, balances, transactions } = require('../controller/transfer');
const authorize = require('../middleware/authorization');

router.route('/').post(authorize, transfer).get(authorize, transactions);
router.route('/balance').get(authorize, balances);

module.exports = router;
