//Import some dependencies
require('dotenv').config();
var crypto = require('crypto');
const { UnAuthorizedError } = require('../errors');

const Webhook = async (req, res) => {
    // // Check If request to webhook is coming from paystack
    // const hash = crypto
    //     .createHmac('sha512', process.env.paystack_secret)
    //     .update(JSON.stringify(req.body))
    //     .digest('hex');
    // // If its not, send an unauthorized error
    // if (hash != req.headers['x-paystack-signature']) {
    //     throw new UnAuthorizedError('Stop thief');
    // }

    // Retrieve the request's body
    const event = req.body;

    console.log(event);
    res.send(200);
};

module.exports = Webhook;
