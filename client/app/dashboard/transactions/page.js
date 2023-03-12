'use client';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import TransactionConfig from './transactionConfig';
import TransactionsList from './transactionsList';
import { IoChevronUp } from 'react-icons/io5';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [transactionType, setTransactionType] = useState('both');
    const [period, setPeriod] = useState('all time');

    // Sample transaction data
    const handleEffect = async () => {
        const transferRes = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}transfer?period=${period}&group=yes&transactionType=${transactionType}`
        );
        const transactions = await transferRes.data.transactions;
        // if (transactions.length <= 0) {
        //     setPeriod('all time');
        // }
        setTransactions(transactions);
    };
    useEffect(() => {
        handleEffect();
    }, [period, transactionType]);

    return (
        <main className="flex flex-col items-center scroll-smooth px-2 py-8 xl:flex-row xl:items-start xl:justify-center xl:gap-x-8">
            <div id="top" className="h-0 w-0"></div>
            <TransactionConfig
                setPeriod={setPeriod}
                setTransactionType={setTransactionType}
                transactionType={transactionType}
                period={period}
            />
            <TransactionsList
                transactions={transactions}
                period={period}
                type={transactionType}
            />
            <a
                href="#top"
                className="fixed bottom-4 right-4 rounded-full p-1 text-3xl text-secondary hover:text-secondary"
            >
                <IoChevronUp />
            </a>
        </main>
    );
};

export default Transactions;
