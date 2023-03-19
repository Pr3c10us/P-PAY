const { User } = require('../models/userDetails');
const Transaction = require('../models/transaction');

const completeTransfer = async (
    { senderId, receiverId, transactionId, amount },
    channel,
    msg
) => {
    const senderDetails = await User.findById(senderId);
    const receiverDetails = await User.findById(receiverId);
    const transaction = await Transaction.findById(transactionId);

    // remove amount from sender and add to receiver
    senderDetails.balance -= +amount;
    senderDetails.totalSpent += +amount;
    receiverDetails.balance += +amount;
    receiverDetails.totalReceived += +amount;

    // update transaction status
    transaction.status = 'success';
    transaction.senderNewBalance = senderDetails.balance;
    transaction.receiverNewBalance = receiverDetails.balance;

    // store new balance
    await senderDetails.save();
    await receiverDetails.save();

    // update transaction
    await transaction.save();
    channel.ack(msg);

    return;
};

module.exports = completeTransfer;
