import React from 'react';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';

const Transactions = ({ transactions, user, border }) => {
    return (
        <div
            className={`flex w-full flex-col items-center space-y-8 overflow-auto ${
                border && 'p-5'
            } px-5 `}
        >
            {transactions.map((transaction, index) => {
                let amount;
                amount = transaction.amount;
                amount = new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                }).format(amount);

                if (amount.split('')[0] !== '-') {
                    amount = '+' + amount;
                }

                let username;
                if (user._id === transaction.sender) {
                    username = '@' + transaction.receiverUsername;
                } else {
                    username = '@' + transaction.senderUsername;
                }

                let fullName;
                if (user._id === transaction.sender) {
                    fullName = transaction.receiverFullName;
                } else {
                    fullName = transaction.senderFullName;
                }
                let fullNameAbbr = `${fullName.split(' ')[0].split('')[0]}${
                    fullName.split(' ')[1].split('')[0]
                }`;

                let receiveDesc = 'Received money';
                let sendDesc = 'Sent money to user';
                if (transaction.transactionType === 'fund') {
                    username = 'Top-up';
                    receiveDesc = 'Fund wallet';
                    fullNameAbbr = 'T';
                }
                if (transaction.transactionType === 'withdraw') {
                    username = `${transaction.receiverFullName.split(' ')[0]} ${
                        transaction.receiverFullName.split(' ')[1]
                    }`;
                    sendDesc = 'Withdraw funds';
                }

                return (
                    <div
                        key={transaction._id}
                        className={`flex w-full items-center gap-x-4 `}
                    >
                        <div
                            className={` flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[0.8rem] text-white xsm:h-9 xsm:w-9 sm:h-10 sm:w-10 sm:text-base`}
                        >
                            {fullNameAbbr.toUpperCase()}
                        </div>
                        <div className="grid w-full flex-1 grid-cols-2 items-center smd:grid-cols-3 xl:grid-cols-2">
                            <h2
                                className={`flex flex-col text-lg font-semibold text-primary  ${
                                    transaction.transactionType === 'withdraw'
                                        ? 'text-base'
                                        : 'sm:text-xl'
                                }`}
                            >
                                {username}
                                {amount.split('')[0] === '-' ? (
                                    <span className="text-[0.7rem] font-normal leading-3 text-gray-400">
                                        {sendDesc}
                                    </span>
                                ) : (
                                    <span className="text-[0.7rem] font-normal leading-3 text-gray-400">
                                        {receiveDesc}
                                    </span>
                                )}
                            </h2>
                            <p
                                className={`hidden w-full justify-center text-[0.8rem] font-medium smd:flex xl:hidden`}
                            >
                                {transaction.createdAt}
                            </p>
                            <p
                                className={`flex flex-col items-end justify-center text-sm font-semibold sm:text-base ${
                                    amount.split('')[0] === '-'
                                        ? 'text-red-600'
                                        : 'text-green-600'
                                }`}
                            >
                                {amount}
                                <span
                                    className={`text-[0.7rem] font-medium leading-3  ${
                                        transaction.status === 'Pending'
                                            ? 'text-orange-500'
                                            : 'text-blue-700'
                                    }`}
                                >
                                    {transaction.status}
                                </span>
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Transactions;
