const router = require('express').Router();
const {
    transfer,
    balances,
    transactions,
    fundWallet,
    getBanks,
    verifyAccount,
    getTransaction,
} = require('../controller/transfer');
const authorize = require('../middleware/authorization');

router.route('/').post(authorize, transfer).get(authorize, transactions);
router.route('/balance').get(authorize, balances);
router.route('/getBanks').get(getBanks);
router.route('/verifyAccount').get(verifyAccount);
router.route('/getTransaction/:id').get(authorize, getTransaction);
router.route('/fund/:reference').get(authorize, fundWallet);

module.exports = router;
