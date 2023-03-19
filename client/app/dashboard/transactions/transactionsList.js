import React, { useState, useEffect } from 'react';
import Transactions from './utils/transactions';
import axios from 'axios';

const TransactionsList = ({ transactions, period }) => {
    const [user, setUser] = useState({});
    const [noTransaction, setNoTransaction] = useState('');

    const handleEffect = async () => {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}user/userDetails`
        );
        const user = await response.data.user;
        setUser(user);

        if (period === 'today' || period === 'yesterday') {
            setNoTransaction(`No Transactions`);
        }
        if (period === 'past week' || period === 'past month') {
            setNoTransaction(`No Transactions`);
        }
        if (period === 'all time') {
            setNoTransaction(`No Transactions yet`);
        }
    };
    useEffect(() => {
        handleEffect();
    }, [period]);
    return (
        <>
            {transactions.length <= 0 ? (
                <div
                    className={`m-4 h-full flex-1 flex bg-no-transaction bg-contain bg-no-repeat w-full max-w-2xl flex-col items-center py-8 justify-start self-center text-3xl`}
                >
                    <h1>{noTransaction}</h1>
                </div>
            ) : (
                <section
                    className={`m-4 flex w-full max-w-2xl flex-col space-y-4 rounded-xl xl:mt-16`}
                >
                    <h1 className="text-xl font-semibold xsm:text-3xl">All Transactions</h1>
                    <div className="flex w-full flex-col items-center space-y-4 ">
                        {transactions.map((transaction, index) => {
                            return (
                                <div
                                    key={index}
                                    className="] w-full max-w-2xl space-y-2 p-1 xsm:p-4"
                                >
                                    <h2 className="text-gray-400">
                                        {transaction.date}
                                    </h2>
                                    <Transactions
                                        transactions={transaction.transactions}
                                        border={false}
                                        user={user}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}
        </>
    );
};

export default TransactionsList;
