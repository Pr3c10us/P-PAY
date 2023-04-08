'use client';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import TransactionConfig from './transactionConfig';
import TransactionsList from './transactionsList';
import { IoChevronUp } from 'react-icons/io5';
import Loading from './loading';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [transactionType, setTransactionType] = useState('both');
    const [period, setPeriod] = useState('all time');
    const [loading, setLoading] = useState(true);

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
        setLoading(false);
    };
    useEffect(() => {
        handleEffect();
    }, [period, transactionType]);

    if (loading) {
        return <Loading />;
    }
    return (
        <main className='flex h-full flex-col items-center scroll-smooth px-2 py-8 xl:flex-row xl:items-start xl:justify-center xl:gap-x-8'>
            <div id='top' className='h-0 w-0'></div>
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
                href='#top'
                className={`absolute bottom-20 right-4 scale-75 rounded-full border bg-secondary p-1 text-3xl text-white transition-all duration-200 hover:bg-black xsm:bottom-4 xsm:scale-100 ${
                    transactions.length <= 0 ? 'hidden' : null
                }`}
            >
                <IoChevronUp />
            </a>
        </main>
    );
};

export default Transactions;
