'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { BsCashStack, BsFillPeopleFill } from 'react-icons/bs';

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
        return (
            <main className="grid py-12 h-full w-full grid-cols-1 bg-vector-pattern bg-small px-4 md:bg-big">
                <div className="flex w-full max-w-md flex-col items-center justify-center space-y-8 place-self-center rounded-xl border bg-neutral p-8  shadow-xl">
                    <div className="flex w-full flex-col items-center justify-center space-y-4">
                        <div className="xsm:h-6 h-4 w-28 xsm:w-40 animate-pulse rounded bg-gray-100 xsm:text-xl"></div>
                        <div className="xsm:h-16 h-12 w-12 xsm:w-16 animate-pulse rounded-lg bg-gray-100"></div>
                        <div
                            className={`xsm:h-6 h-4 w-24 xsm:w-32 animate-pulse rounded bg-gray-100 font-semibold xsm:text-xl`}
                        ></div>
                    </div>

                    <div className="flex w-full flex-col items-center justify-center">
                        <div className="flex w-full items-center justify-between border-b py-6 text-sm xsm:text-base">
                            <h2 className="xsm:h-6 xsm:w-24 h-4 w-16 animate-pulse rounded bg-gray-100"></h2>
                            <div className="flex xsm:h-6 h-4 w-32 xsm:w-44 animate-pulse flex-col items-end rounded bg-gray-100 text-sm font-medium text-gray-500"></div>
                        </div>
                        <div className="flex w-full items-center justify-between border-b py-6 text-sm xsm:text-base">
                            <h2 className="xsm:h-6 xsm:w-24 h-4 w-16 animate-pulse rounded bg-gray-100"></h2>
                            <div className="flex xsm:h-6 h-4 w-32 xsm:w-44 animate-pulse flex-col items-end rounded bg-gray-100 text-sm font-medium text-gray-500"></div>
                        </div>
                        <div className="flex w-full items-center justify-between border-b py-6 text-sm xsm:text-base">
                            <h2 className="xsm:h-6 xsm:w-24 h-4 w-16 animate-pulse rounded bg-gray-100"></h2>
                            <div className="flex xsm:h-6 h-4 w-32 xsm:w-44 animate-pulse flex-col items-end rounded bg-gray-100 text-sm font-medium text-gray-500"></div>
                        </div>
                        <div className="flex w-full items-center justify-between border-b py-6 text-sm xsm:text-base">
                            <h2 className="xsm:h-6 xsm:w-24 h-4 w-16 animate-pulse rounded bg-gray-100"></h2>
                            <div className="flex xsm:h-6 h-4 w-32 xsm:w-44 animate-pulse flex-col items-end rounded bg-gray-100 text-sm font-medium text-gray-500"></div>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() =>
                                router.push('/dashboard/transactions')
                            }
                            className="xsm:h-8 h-6 w-16 xsm:w-20 animate-pulse rounded-lg bg-gray-100 text-sm text-white xsm:py-2 xsm:px-6"
                        ></button>
                    </div>
                </div>
            </main>
        );
    }
    return (
        <main className="grid h-full py-12 w-full grid-cols-1 bg-vector-pattern bg-small px-4 md:bg-big">
            <div className="flex w-full max-w-md flex-col items-center justify-center space-y-8 place-self-center rounded-xl border bg-neutral p-8  shadow-xl">
                <div className="flex w-full flex-col items-center justify-center space-y-4">
                    <div className="xsm:text-xl">{date}</div>
                    <div className="rounded-lg border bg-gradient-to-r from-white to-secondary p-3">
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
