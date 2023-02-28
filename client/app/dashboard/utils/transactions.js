import React from 'react';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';

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

                let username;
                if (user.username === transaction.sender) {
                    username = '@' + transaction.receiver;
                } else {
                    username = '@' + transaction.sender;
                }

                return (
                    <div className="flex w-full items-center gap-x-4">
                        {user.username === transaction.sender ? (
                            <GiPayMoney className=" rounded-full border bg-gradient-to-tr from-black via-red-500 to-secondary p-2 text-4xl text-white" />
                        ) : (
                            <GiReceiveMoney className=" rounded-full border bg-gradient-to-tr from-black via-green-500 to-secondary p-2 text-4xl text-white" />
                        )}
                        <div className="grid w-full flex-1 grid-cols-2 items-center smd:grid-cols-3 xl:grid-cols-2">
                            <h2 className="text-lg  text-secondary">
                                {username}
                            </h2>
                            <p
                                className={`flex justify-end  smd:justify-start xl:justify-end ${
                                    user.username === transaction.sender
                                        ? 'text-red-600'
                                        : 'text-green-600'
                                }`}
                            >
                                {amount}
                            </p>
                            <p className="hidden justify-end text-[0.8rem] smd:flex lg:text-base xl:hidden">
                                {transaction.createdAt}
                            </p>
                        </div>
                    </div>
                );
            })}
            {transactions.length >= 5 && (
                <Link
                    href="/dashboard/transactions"
                    className="relative flex w-28 items-center justify-center gap-1 border-opacity-0 text-lg font-semibold text-secondary transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:border-opacity-100 hover:after:w-full"
                >
                    {' '}
                    View more <BsArrowRightShort />
                </Link>
            )}
        </div>
    );
};

export default Transactions;
