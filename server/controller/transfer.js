const bcrypt = require('bcryptjs');
const { User } = require('../models/userDetails');
const { NotFoundError, BadRequestError, ForbiddenError } = require('../errors');
const Transaction = require('../models/transaction');
const midnightConverter = require('../utils/midnightConverter');
const rabbitChannel = require('../rabbitMq/channel');

const transfer = async (req, res) => {
    const { pin, receiver, amount } = req.body;

    // check if all values are provided
    if (amount <= 0 || !amount) {
        throw new BadRequestError('Provide a valid amount');
    }
    if (!pin) {
        throw new BadRequestError('Provide your pin');
    }
    if (!receiver) {
        throw new BadRequestError('Provide username to send money');
    }

    // get sender id
    const { id } = req.user;
    // get sender details
    const senderDetails = await User.findById(id);

    // check if user is trying to send to own account
    if (receiver === senderDetails.username) {
        throw new ForbiddenError(`you can't send to yourself`);
    }

    // check if pin is correct
    const isMatch = await bcrypt.compare(pin, senderDetails.pin);
    if (!isMatch) {
        throw new BadRequestError('The pin you entered is incorrect');
    }

    // check if receiver exist
    const receiverDetails = await User.findOne({ username: receiver });
    if (!receiverDetails) {
        throw new NotFoundError('user does not exist');
    }

    // check if sender has enough in balance
    if (amount > senderDetails.balance) {
        throw new ForbiddenError('Insufficient Balance');
    }

    // remove amount from sender and add to receiver
    // senderDetails.balance -= amount;
    // senderDetails.totalSpent += amount;
    // receiverDetails.balance += amount;
    // receiverDetails.totalReceived += amount;

    // create a new transaction for the transfer
    const transactionParams = {
        sender: senderDetails.username,
        receiver,
        amount,
        status: 'Pending',
        fullName: `${receiverDetails.firstname} ${receiverDetails.lastname}`,
    };

    const transaction = await Transaction.create(transactionParams);
    const { channel } = await rabbitChannel();
    channel.sendToQueue(
        'Transfer',
        Buffer.from(
            JSON.stringify({
                senderId: senderDetails._id,
                receiverId: receiverDetails._id,
                transactionId: transaction._id,
                amount,
            })
        ),
        { persistent: true }
    );

    res.json({ msg: 'Transaction Pending' });
};

const balances = async (req, res) => {
    // get if type is month
    const { type, limit } = req.query;
    // get user id stored in req.user
    const { id } = req.user;

    // get user details
    const user = await User.findById(id);

    // get all transactions associated with user and sort in descending order
    const results = await Transaction.find({
        $or: [{ sender: user.username }, { receiver: user.username }],
        status: 'Successful',
    })
        .sort({
            createdAt: -1,
        })
        .limit(limit);

    // initialize balance
    let balances = {};

    // if type is month display last balance at the end of each month
    if (type === 'year') {
        results.forEach(function (result) {
            // get date in only year and month
            let date = result.createdAt.toDateString();
            const month = date.split(' ')[1];
            const year = date.split(' ')[3];
            const monthDate = `${month} ${year}`;

            // for each transaction check if the month doesn't exist in our balances var else if it does skip and move to next transaction
            if (!balances[monthDate]) {
                // if user is receiving check store the receiver balance
                if (user.username === result.receiver) {
                    // store in them as obj of 'date' & 'balance' so we can later convert balance to array of objects
                    balances[monthDate] = {
                        date: monthDate,
                        balance: result.receiverNewBalance,
                    };
                }

                // if user is sending check store the sender balance
                if (user.username === result.sender) {
                    // store in them as obj of 'date' & 'balance' so we can later convert balance to array of objects
                    balances[monthDate] = {
                        date: monthDate,
                        balance: result.senderNewBalance,
                    };
                }
            }
        });

        // reduce to only first 12
        balances = Object.fromEntries(Object.entries(balances).slice(0, 12));
        // convert obj to array of obj
        balances = Object.values(balances);

        // send back balances
        return res.json({ nbHits: balances.length, balances });
    }

    // if type is not month display last balance at the end of each day
    results.forEach(function (result) {
        // get date
        let date = result.createdAt.toDateString();
        date = date.split(' ')[1] + ' ' + date.split(' ')[2];

        // for each transaction check if the date doesn't exist in our balances var else if it does skip and move to next transaction
        if (!balances[date]) {
            // if user is receiving check store the receiver balance
            if (user.username === result.receiver) {
                // store in them as obj of 'date' & 'balance' so we can later convert balance to array of objects
                balances[date] = { date, balance: result.receiverNewBalance };
            }
            // if user is sending check store the sender balance
            if (user.username === result.sender) {
                // store in them as obj of 'date' & 'balance' so we can later convert balance to array of objects
                balances[date] = { date, balance: result.senderNewBalance };
            }
        }
    });

    // reduce to only first 31
    if (type === 'month') {
        balances = Object.fromEntries(Object.entries(balances).slice(0, 31));
    }
    if (type === 'week') {
        balances = Object.fromEntries(Object.entries(balances).slice(0, 7));
    }
    // convert obj to array of obj
    balances = Object.values(balances);

    // send back balances
    res.json({ nbHits: balances.length, balances });
};

const transactions = async (req, res) => {
    // Get User Id
    const { id } = req.user;

    // get user details
    const user = await User.findById(id);

    // Get query parameters
    const { transactionType, period, limit, group } = req.query;

    // Set filter to an object with createdAt set
    let filter = { createdAt: {} };

    // Set filter for both transaction types if transactionType is not provided
    if (!transactionType || transactionType === 'both') {
        filter.$or = [{ sender: user.username }, { receiver: user.username }];
    }
    // Set filter for either credit or debit transactions
    if (transactionType === 'debit') {
        filter.sender = user.username;
    }
    if (transactionType === 'credit') {
        filter.receiver = user.username;
    }

    // run some logic if period is month for last 30 days transaction, seven for last 7 days transaction, yesterday and today and else all time
    if (period) {
        let date = new Date();

        if (period === 'past month') {
            let oneMonthAgo = new Date(
                date.getTime() - 30 * 24 * 60 * 60 * 1000
            );
            oneMonthAgo = await midnightConverter(oneMonthAgo);

            filter.createdAt.$gte = oneMonthAgo;
            filter.createdAt.$lte = date;
        }
        if (period === 'past week') {
            let sevenDaysAgo = new Date(
                date.getTime() - 7 * 24 * 60 * 60 * 1000
            );
            sevenDaysAgo = await midnightConverter(sevenDaysAgo);

            filter.createdAt.$gte = sevenDaysAgo;
            filter.createdAt.$lte = date;
        }
        if (period === 'yesterday') {
            let yesterday = new Date(date.getTime() - 1 * 24 * 60 * 60 * 1000);
            yesterday = await midnightConverter(yesterday);

            const endDate = await midnightConverter(date);

            filter.createdAt.$gte = yesterday;
            filter.createdAt.$lte = endDate;
        }
        if (period === 'today') {
            let today = new Date(date);
            today = await midnightConverter(today);

            filter.createdAt.$gte = today;
            filter.createdAt.$lte = date;
        }
        if (period === 'all time') {
            delete filter.createdAt;
        }
    } else {
        // delete createdAt key if no period is provided
        delete filter.createdAt;
    }

    //Get all Transactions associated to user based on filter
    let transactions = await Transaction.find(filter)
        .sort({
            createdAt: -1,
        })
        .select('-senderNewBalance -receiverNewBalance -__v -updatedAt')
        .limit(limit);

    // if transaction is a debit transaction,display the amount as negative in response
    transactions.forEach((transaction) => {
        if (transaction.sender === user.username) {
            transaction.amount = -1 * transaction.amount;
        }
    });

    // if group is yes the group transactions by date
    if (group === 'yes') {
        transactions = transactions.reduce((acc, transaction) => {
            const date = transaction.createdAt.toDateString();
            if (!acc[date]) {
                acc[date] = [transaction];
            } else {
                acc[date].push(transaction);
            }
            return acc;
        }, {});

        // we now convert transaction from object gotten from reduce function to array
        transactions = Object.entries(transactions).map(
            ([date, transactions]) => ({
                date,
                transactions: transactions.map((result) => {
                    const localizedCreatedAt =
                        result.createdAt.toLocaleString();
                    return {
                        ...result.toObject(),
                        createdAt: localizedCreatedAt,
                    };
                }),
            })
        );
        // Respond with all transactions
        return res.json({
            transactions,
        });
    }

    //
    const newTransactions = transactions.map((result) => {
        const localizedCreatedAt = result.createdAt.toLocaleString();
        return { ...result.toObject(), createdAt: localizedCreatedAt };
    });

    // Respond with all transactions
    res.json({
        transactions: newTransactions,
    });
};

module.exports = { transfer, balances, transactions };
