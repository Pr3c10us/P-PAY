const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        sender: {
            type: String,
            required: [true, 'Provide sender id'],
        },
        receiver: {
            type: String,
            required: [true, 'Provide receiver id'],
        },
        receiverUsername: {
            type: String,
            required: [true, 'Provide receiver username'],
        },
        senderUsername: {
            type: String,
            required: [true, 'Provide sender username'],
        },
        amount: {
            type: Number,
            required: [true, 'Provide amount sent'],
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
        receiverFullName: {
            type: String,
        },
        senderFullName: {
            type: String,
        },
        transactionType: {
            type: String,
        },
        sessionId: {
            type: String,
        },
    },
    { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
