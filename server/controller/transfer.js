const bcrypt = require('bcryptjs');
require('dotenv').config;
const { v4: uuidv4 } = require('uuid');
const { User } = require('../models/userDetails');
const {
    NotFoundError,
    BadRequestError,
    ForbiddenError,
    UnAuthorizedError,
} = require('../errors');
const Transaction = require('../models/transaction');
const midnightConverter = require('../utils/midnightConverter');
const rabbitChannel = require('../rabbitMq/channel');
const axios = require('axios');

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
        sender: senderDetails.id,
        receiver: receiverDetails.id,
        senderUsername: senderDetails.username,
        receiverUsername: receiver,
        amount,
        transactionType: 'transfer',
        status: 'Pending',
        receiverFullName: `${receiverDetails.firstname} ${receiverDetails.lastname}`,
        senderFullName: `${senderDetails.firstname} ${senderDetails.lastname}`,
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
                transactionType: 'transfer',
            })
        ),
        { persistent: true }
    );

    res.json({ msg: 'Transaction Pending' });
};

const fundWallet = async (req, res) => {
    // get user id
    const { id } = req.user;

    // get reference key
    const { reference } = req.params;

    // set url and header variable
    const url = `https://api.paystack.co/transaction/verify/${reference}`;
    const config = {
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
    };

    // get user info
    const user = await User.findById(id);

    // verify and get transaction from paystack
    const paystackTransaction = await axios.get(url, config);
    let transactionData = paystackTransaction.data.data;
    transactionData.amount = transactionData.amount / 100;

    // // create transaction parameter to be stored
    // const transactionParams = {
    //     sender: transactionData.reference,
    //     receiver: user.id,
    //     senderUsername: 'fund',
    //     receiverUsername: user.username,
    //     amount: transactionData.amount,
    //     transactionType: 'fund',
    //     status: transactionData.status,
    //     receiverFullName: `${user.firstname} ${user.lastname}`,
    //     senderFullName: `Fund Wallet`,
    //     receiverNewBalance: user.balance,
    // };

    // await Transaction.create(transactionParams);
    // Add amount to user balance
    // user.balance += +transactionData.amount;
    // user.totalReceived += +transactionData.amount;

    // await user.save();

    // create a new transaction for the transfer
    const transactionParams = {
        sender: transactionData.reference,
        receiver: user.id,
        senderUsername: 'fund',
        receiverUsername: user.username,
        amount: transactionData.amount,
        transactionType: 'fund',
        status: 'Pending',
        receiverFullName: `${user.firstname} ${user.lastname}`,
        senderFullName: `Fund Wallet`,
    };

    const transaction = await Transaction.create(transactionParams);
    const { channel } = await rabbitChannel();
    channel.sendToQueue(
        'Transfer',
        Buffer.from(
            JSON.stringify({
                senderId: transactionData.reference,
                receiverId: user._id,
                transactionId: transaction._id,
                amount: transactionData.amount,
                transactionType: 'fund',
            })
        ),
        { persistent: true }
    );

    res.send('complete');
};

const withdraw = async (req, res) => {
    const { pin, name, account_number, bank_code, amount } = req.body;

    // check if all values are provided
    if (amount <= 0 || !amount) {
        throw new BadRequestError('Provide a valid amount');
    }
    if (!pin) {
        throw new BadRequestError('Provide your pin');
    }
    if (!account_number || !bank_code || !name) {
        throw new BadRequestError(
            'Provide valid account number and bank code with account name'
        );
    }

    // get sender id
    const { id } = req.user;

    // get user info
    const user = await User.findById(id);

    // throw error if amount is bigger than balance
    if (amount > user.balance) {
        throw new ForbiddenError('cant withdraw more than you have');
    }

    // check if pin is correct
    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) {
        throw new BadRequestError('The pin you entered is incorrect');
    }

    // generate a v4 uuid
    let reference = uuidv4();

    const transactionParams = {
        sender: user.id,
        receiver: reference,
        senderUsername: user.username,
        receiverUsername: account_number,
        amount,
        transactionType: 'withdraw',
        status: 'Pending',
        receiverFullName: name,
        senderFullName: `${user.firstname} ${user.lastname}`,
    };

    const transaction = await Transaction.create(transactionParams);
    const { channel } = await rabbitChannel();
    channel.sendToQueue(
        'Transfer',
        Buffer.from(
            JSON.stringify({
                senderId: user.id,
                receiverId: reference,
                transactionId: transaction._id,
                amount,
                transactionType: 'withdraw',
            })
        ),
        { persistent: true }
    );
    res.send('complete');

    // // set url headers and body to get recipient code
    // const recipientUrl = `https://api.paystack.co/transferrecipient`;
    // const recipientConfig = {
    //     headers: {
    //         Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    //         'Content-Type': 'application/json',
    //     },
    // };
    // const recipientBody = {
    //     type: 'nuban',
    //     name,
    //     account_number,
    //     bank_code,
    //     currency: 'NGN',
    // };

    // // get recipient code for transfer
    // const response = await axios.post(
    //     recipientUrl,
    //     recipientBody,
    //     recipientConfig
    // );
    // const recipient = response.data.data.recipient_code;

    // // set url headers and body to initiate transfer
    // const transferUrl = `https://api.paystack.co/transfer`;
    // const transferConfig = {
    //     headers: {
    //         Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    //         'Content-Type': 'application/json',
    //     },
    // };
    // const transferBody = {
    //     source: 'balance',
    //     amount: amount,
    //     reference,
    //     recipient,
    //     reason: 'Withdrawal of funds',
    // };
    // try {
    //     // initiate transfer
    //     await axios.post(transferUrl, transferBody, transferConfig);

    //     res.json({ msg: 'Transfer in progress' });
    // } catch (error) {
    //     console.log(error);
    //     // if there is an error send transfer failed message
    //     throw new BadRequestError('Transfer failed');
    // }
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
        $or: [{ sender: user.id }, { receiver: user.id }],
        status: 'success',
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
                if (user.id === result.receiver) {
                    // store in them as obj of 'date' & 'balance' so we can later convert balance to array of objects
                    balances[monthDate] = {
                        date: monthDate,
                        balance: result.receiverNewBalance,
                    };
                }

                // if user is sending check store the sender balance
                if (user.id === result.sender) {
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
            if (user.id === result.receiver) {
                // store in them as obj of 'date' & 'balance' so we can later convert balance to array of objects
                balances[date] = { date, balance: result.receiverNewBalance };
            }
            // if user is sending check store the sender balance
            if (user.id === result.sender) {
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
        filter.$or = [{ sender: user.id }, { receiver: user.id }];
    }
    // Set filter for either credit or debit transactions
    if (transactionType === 'debit') {
        filter.sender = user.id;
    }
    if (transactionType === 'credit') {
        filter.receiver = user.id;
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
        if (transaction.sender === user.id) {
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

const getBanks = async (req, res) => {
    const url = 'https://api.paystack.co/bank';
    const config = {
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
    };

    const response = await axios.get(url, config);
    let data = response.data.data;

    let banks = data.map((bank) => {
        return { name: bank.name, code: bank.code };
    });

    res.json({ banks });
};
const verifyAccount = async (req, res) => {
    // get account number and bank code
    const { account_number, bank_code } = req.query;

    const url = `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`;
    const config = {
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
    };

    const response = await axios.get(url, config);
    let data = response.data.data;

    res.json(data);
};

const getTransaction = async (req, res) => {
    //  get user id
    const { id: userId } = req.user;

    // get transaction id
    const { id } = req.params;

    // get user info
    const user = await User.findById(userId);

    let transaction = await Transaction.findOne({
        _id: id,
        $or: [{ sender: user.id }, { receiver: user.id }],
    }).select(
        ' receiverUsername sender receiver senderUsername amount status receiverFullName senderFullName transactionType createdAt sessionId'
    );

    if (transaction.sender === user.id) {
        transaction.amount = -transaction.amount;
    }

    res.json({ transaction, date: transaction.createdAt.toDateString() });

    //
};

module.exports = {
    transfer,
    fundWallet,
    balances,
    transactions,
    getBanks,
    verifyAccount,
    getTransaction,
    withdraw,
};
