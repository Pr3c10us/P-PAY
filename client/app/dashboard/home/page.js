'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Top from './top';
import TotalBalanceBarChart from './utils/totalBalanceChart';
import MidTotal from './midTotal';
import Image from 'next/image';
import Transactions from './utils/transactions';
import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';
import Loading from './loading';
import Options from './options';

const Dashboard = () => {
    const [user, setUser] = useState({});
    const [balance, setBalance] = useState([]);
    const [totalSpent, setTotalSpent] = useState([]);
    const [totalReceived, setTotalReceived] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

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
        setLoading(false);
    };
    useEffect(() => {
        handleEffect();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <main className={`grid h-full w-full grid-cols-3`}>
            <section
                className={`col-span-3 flex flex-col items-center space-y-4 py-4 md:space-y-8 ${
                    transactions.length <= 0 ? null : 'xl:col-span-2'
                }`}
            >
                <Top user={user} balance={balance} />
                <MidTotal
                    totalReceived={totalReceived}
                    totalSpent={totalSpent}
                />
                <Options />
                <article className="hidden h-full w-full justify-center px-2 xsm:px-12 xl:flex">
                    {transactions.length <= 0 ? (
                        <div className=" flex h-full w-full justify-center bg-no-transaction bg-contain bg-center bg-no-repeat  py-8">
                            <h1 className="text-center text-3xl">
                                No Recent Activity
                            </h1>
                            {/* <div className="flex w-full items-center justify-center">
                                <Image
                                    src="/noTransaction.svg"
                                    width={500}
                                    height={300}
                                    alt="p-pay"
                                    className=""
                                    priority
                                />
                            </div> */}
                        </div>
                    ) : (
                        <TotalBalanceBarChart />
                    )}
                </article>
                <article className="flex h-full w-full flex-col space-y-2 px-2 xsm:px-12 xl:hidden">
                    <div className="flex items-center justify-between">
                        <h1
                            className={`text-lg  ${
                                transactions.length <= 0 ? 'hidden' : null
                            }`}
                        >
                            Recent
                        </h1>
                        {transactions.length >= 5 && (
                            <Link
                                href="/dashboard/transactions"
                                className="relative flex w-28 items-center justify-center gap-1 border-opacity-0 text-sm font-semibold text-secondary transition-all duration-300 hover:border-opacity-100"
                            >
                                {' '}
                                See more
                            </Link>
                        )}
                    </div>
                    {transactions.length <= 0 ? (
                        <div className=" flex h-full w-full justify-center bg-no-transaction bg-contain bg-center bg-no-repeat py-8">
                            <h1 className="text-center text-3xl">
                                No Recent Activity
                            </h1>
                        </div>
                    ) : (
                        <Transactions
                            transactions={transactions}
                            user={user}
                            border={true}
                        />
                    )}
                </article>
            </section>
            <section
                className={`hidden flex-col border-l bg-white py-4 pl-4 shadow-xl ${
                    transactions.length <= 0 ? null : 'xl:flex'
                }`}
            >
                <div className={`flex w-full`}>
                    <Image
                        src="/undraw-card4.svg"
                        width={807}
                        height={677}
                        alt="card"
                        className=""
                        priority
                    />
                </div>
                <div className={`h-full w-full`}>
                    <article className="flex h-full w-full flex-col space-y-2 px-2">
                        {transactions.length <= 0 ? (
                            <></>
                        ) : (
                            <>
                                <div className="flex items-center justify-between">
                                    <h1 className="text-lg underline">
                                        Recent Activities
                                    </h1>
                                    {transactions.length >= 5 && (
                                        <Link
                                            href="/dashboard/transactions"
                                            className="relative flex w-28 items-center justify-center gap-1 border-opacity-0 text-sm font-semibold text-secondary transition-all duration-300 hover:border-opacity-100"
                                        >
                                            {' '}
                                            See more
                                        </Link>
                                    )}
                                </div>
                                <Transactions
                                    transactions={transactions}
                                    user={user}
                                    border={false}
                                />
                            </>
                        )}
                    </article>
                </div>
            </section>
        </main>
    );
};

export default Dashboard;
