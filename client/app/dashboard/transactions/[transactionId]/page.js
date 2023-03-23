'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { BsCashStack, BsFillPeopleFill } from 'react-icons/bs';
import Loading from './loading';

const SingleTransaction = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [id, setId] = useState(pathname.split('/')[3]);
    const [transaction, setTransaction] = useState({});
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(true);

    const handleEffect = async () => {
        axios.defaults.withCredentials = true;
        axios
            .get(
                `${process.env.NEXT_PUBLIC_API_URL}transfer/getTransaction/${id}`
            )
            .then((response) => {
                // const transactionRes = response.data;
                // transactionRes.date = transactionRes.createdAt.toDateString();
                setTransaction(response.data.transaction);
                setDate(response.data.date);

                setLoading(false);
            })
            .catch((error) => {
                // router.push('/login');
            });
    };
    useEffect(() => {
        handleEffect();
    }, []);

    if (loading) {
        return <Loading />;
    }
    return (
        <main className="grid h-full w-full grid-cols-1 bg-vector-pattern bg-small py-12 px-4 md:bg-big">
            <div className="flex w-full max-w-md flex-col items-center justify-center space-y-8 place-self-center rounded-xl border bg-neutral p-8  shadow-xl">
                <div className="flex w-full flex-col items-center justify-center space-y-4">
                    <div className="xsm:text-xl">{date}</div>
                    <div className="rounded-lg border bg-secondary text-white p-3">
                        {/* BsFillPeopleFill */}
                        {transaction.transactionType === 'transfer' && (
                            <BsFillPeopleFill className="h-6 w-6 xsm:h-10 xsm:w-10" />
                        )}
                        {(transaction.transactionType === 'fund' ||
                            transaction.transactionType === 'withdraw') && (
                            <BsCashStack className="h-6 w-6 xsm:h-10 xsm:w-10" />
                        )}
                    </div>
                    <div
                        className={`font-semibold xsm:text-xl ${
                            transaction.amount < 0
                                ? 'text-red-500'
                                : 'text-green-500'
                        }`}
                    >
                        <h1>
                            {Intl.NumberFormat('en-NG', {
                                style: 'currency',
                                currency: 'NGN',
                            }).format(transaction.amount)}{' '}
                        </h1>
                    </div>
                </div>

                <div className="flex w-full flex-col items-center justify-center">
                    <div className="flex w-full items-center justify-between border-b py-4 text-sm xsm:text-base">
                        <h2>Transaction Type</h2>
                        <div className="flex flex-col items-end text-sm font-medium text-gray-500">
                            <h2 className="flex-1 text-lg font-semibold capitalize text-black">
                                {transaction.transactionType}
                            </h2>
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-4 text-sm xsm:text-base">
                        <h2>From</h2>
                        <div className="flex flex-col items-end text-sm font-medium text-gray-500">
                            <h2 className="flex-1 text-lg font-semibold capitalize text-black">
                                {transaction.senderFullName}
                            </h2>
                            <h3>
                                {transaction.transactionType == 'transfer'
                                    ? '@'
                                    : null}
                                {transaction.transactionType == 'withdraw'
                                    ? '@'
                                    : null}
                                {transaction.senderUsername}
                            </h3>
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-4 text-sm xsm:text-base">
                        <h2>To</h2>
                        <div className="flex flex-col items-end text-sm font-medium text-gray-500">
                            <h2 className="flex-1 text-lg font-semibold capitalize text-black">
                                {transaction.receiverFullName}
                            </h2>
                            <h3>
                                {transaction.transactionType == 'transfer'
                                    ? '@'
                                    : null}
                                {transaction.transactionType == 'fund'
                                    ? '@'
                                    : null}
                                {transaction.receiverUsername}
                            </h3>
                        </div>
                    </div>
                    <div
                        className={`flex w-full items-center justify-between gap-2 py-4 text-xs xsm:text-base ${
                            transaction.sessionId ? 'border-b' : null
                        }`}
                    >
                        <h2>Transaction Id</h2>
                        <div className="text-[0.5rem] font-medium xsm:text-base">
                            {transaction._id}
                        </div>
                    </div>
                    {transaction.sessionId ? (
                        <div className="flex w-full items-center justify-between gap-2 py-4 text-xs xsm:text-base">
                            <h2>Transaction Id</h2>
                            <div className="text-[0.5rem] font-medium xsm:text-base">
                                {transaction._id}
                            </div>
                        </div>
                    ) : null}
                </div>
                <div>
                    <button
                        onClick={() => router.push('/dashboard/transactions')}
                        className="rounded-lg bg-secondary py-1.5 px-4 text-sm text-white xsm:py-2 xsm:px-6"
                    >
                        Return
                    </button>
                </div>
            </div>
        </main>
    );
};

export default SingleTransaction;
