const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        sender: {
            type: String,
            required: [true, 'Provide sender username.'],
        },
        receiver: {
            type: String,
            required: [true, 'Provide receiver username.'],
        },
        amount: {
            type: Number,
            required: [true, 'Provide amount sent.'],
        },
        status: {
            type: String,
            default: 'pending',
        },
        senderNewBalance: {
            type: Number,
        },
        receiverNewBalance: {
            type: Number,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
