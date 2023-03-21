'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Loading() {
    const [transactions, setTransactions] = useState([]);

    const handleEffect = async () => {
        axios.defaults.withCredentials = true;

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
                className={`col-span-3 flex flex-col items-center space-y-8 py-4  ${
                    transactions.length <= 0 ? 'col-span-3' : 'xl:col-span-2'
                }`}
            >
                <article
                    className={`flex w-full max-w-3xl flex-col items-center justify-center px-2 xsm:px-12 sm:flex-row sm:items-center sm:justify-around`}
                >
                    <div className="flex animate-pulse items-center gap-x-2 p-4 sm:flex-col sm:items-start sm:gap-y-4">
                        <span className="h-6 w-24 rounded-md bg-gray-100"></span>
                        <span className="h-7 w-36 rounded-md bg-gray-100">
                            {/* @{user.username} */}
                        </span>
                    </div>
                    <div className="flex h-32 w-full animate-pulse  flex-col space-y-4 rounded-md bg-gray-200 py-4 text-white xsm:h-40 sm:w-[350px]"></div>
                </article>
                <article className="flex w-full justify-center px-2 xsm:px-12">
                    <div className="flex h-20 w-full max-w-3xl animate-pulse items-center justify-around gap-4 rounded-xl bg-gray-200 px-4 py-4 xsm:h-24 xsm:min-w-[350px] xsm:flex-row"></div>
                </article>
                <article
                    className={`flex h-full w-full flex-col space-y-4 px-2 xsm:px-12 ${
                        transactions.length <= 0
                            ? 'flex max-w-3xl'
                            : 'xl:hidden'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <h1
                            className={`h-6 w-[40%] animate-pulse rounded-md bg-gray-100 text-lg underline xsm:w-44`}
                        ></h1>
                    </div>
                    <div
                        className={`flex w-full flex-col items-center space-y-8 overflow-auto px-5 `}
                    >
                        <div
                            className={`flex h-16 w-full animate-pulse items-center gap-x-4 rounded-lg bg-gray-200 xsm:h-20 `}
                        ></div>
                        <div
                            className={`flex h-16 w-full animate-pulse items-center gap-x-4 rounded-lg bg-gray-200 xsm:h-20 `}
                        ></div>
                    </div>
                </article>{' '}
                <article
                    className={`hidden h-full w-full justify-center px-2 xsm:px-12 ${
                        transactions.length <= 0 ? 'hidden' : 'xl:flex'
                    }`}
                >
                    <div className="flex h-full w-full max-w-2xl animate-pulse flex-col items-start justify-center gap-y-4 rounded-2xl border-2 px-4 py-3">
                        <div className="flex w-full items-center justify-between text-lg font-semibold">
                            <h1 className="h-6 w-[20%] rounded-md bg-gray-100"></h1>
                            <div className="flex items-center justify-center gap-2 text-gray-400">
                                <button
                                    className={`h-8 w-10 rounded-lg border-2 bg-gray-200 py-1 text-sm`}
                                ></button>
                                <button
                                    className={`h-8 w-10 rounded-lg border-2 bg-gray-200 py-1 text-sm`}
                                ></button>
                                <button
                                    className={`h-8 w-10 rounded-lg border-2 bg-gray-200 py-1 text-sm`}
                                ></button>
                            </div>
                        </div>
                        <div className=" h-full w-full "></div>
                    </div>
                </article>
            </section>
            <section
                className={`hidden flex-col border-l bg-white py-4 pl-4 shadow-xl  ${
                    transactions.length <= 0 ? 'hidden' : 'xl:flex'
                }`}
            >
                <div className={`flex h-[85%] w-full`}></div>
                <article className="flex h-full w-full flex-col space-y-4 px-2 ">
                    <div className="flex items-center justify-between">
                        <h1
                            className={`h-6 w-[30%] animate-pulse rounded-md bg-gray-100 text-lg underline xsm:w-44`}
                        ></h1>
                    </div>
                    <div
                        className={`flex w-full flex-col items-center space-y-4 overflow-auto px-5 `}
                    >
                        <div
                            className={`flex h-14 w-full animate-pulse items-center gap-x-4 rounded-lg bg-gray-200`}
                        ></div>
                        <div
                            className={`flex h-14 w-full animate-pulse items-center gap-x-4 rounded-lg bg-gray-200`}
                        ></div>
                        <div
                            className={`flex h-14 w-full animate-pulse items-center gap-x-4 rounded-lg bg-gray-200`}
                        ></div>
                    </div>
                </article>{' '}
            </section>
        </main>
    );
}
