'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Top from './top';
import TotalBalanceBarChart from './utils/totalBalanceChart';
import MidTotal from './midTotal';
import Image from 'next/image';
import Transactions from './utils/transactions';

const Dashboard = () => {
    const [user, setUser] = useState({});
    const [balance, setBalance] = useState([]);
    const [totalSpent, setTotalSpent] = useState([]);
    const [totalReceived, setTotalReceived] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const handleEffect = async () => {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}user/userDetails`
        );
        const user = await response.data.user;
        setUser(user);
        let balance = user.balance;
        let totalReceived = user.totalReceived;
        let totalSpent = user.totalSpent;

        balance = balance.toLocaleString().split('.');
        totalReceived = totalReceived.toLocaleString().split('.');
        totalSpent = totalSpent.toLocaleString().split('.');

        setBalance(balance);
        setTotalReceived(totalReceived);
        setTotalSpent(totalSpent);

        const transferRes = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}transfer?limit=5`
        );
        const transactions = await transferRes.data.transactions;
        setTransactions(transactions);
    };
    useEffect(() => {
        handleEffect();
    }, []);

    return (
        <main className={`grid h-full w-full grid-cols-3`}>
            <section
                className={`col-span-3 flex flex-col space-y-8 py-4 xl:col-span-2`}
            >
                <Top user={user} balance={balance} />
                <MidTotal
                    totalReceived={totalReceived}
                    totalSpent={totalSpent}
                />
                <article className="hidden h-full w-full justify-center px-2 xsm:px-12 xl:flex">
                    <TotalBalanceBarChart />
                </article>
                <article className="flex h-full w-full flex-col space-y-2 px-2 xsm:px-12 xl:hidden">
                    <h1 className="text-lg underline">Recent Activities</h1>
                    <Transactions
                        transactions={transactions}
                        user={user}
                        border={true}
                    />
                </article>
            </section>
            <section className={`hidden flex-col py-4 xl:flex`}>
                <div className={`flex h-full w-full px-4`}>
                    <Image
                        src="/undraw-card1.svg"
                        width={807}
                        height={677}
                        alt="card"
                        className=""
                        priority
                    />
                </div>
                <div className={`h-full w-full`}>
                    <article className="flex h-full w-full flex-col space-y-2 px-2">
                        <h1 className="text-lg underline">Recent Activities</h1>
                        <Transactions
                            transactions={transactions}
                            user={user}
                            border={false}
                        />
                    </article>
                </div>
            </section>
        </main>
    );
};

export default Dashboard;
