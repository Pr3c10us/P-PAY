'use client';
import '../styles/globals.css';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Home = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    return (
        <main className="font-dmsans absolute inset-0 flex h-full w-auto flex-col bg-gradient-to-r from-white to-blue-100">
            <nav className="sticky inset-x-0 top-0 flex flex-col">
                <div className="z-20 flex items-center py-3 px-5 md:px-10 md:py-5">
                    <div className="flex cursor-default items-baseline p-2">
                        <Link href="/">
                            <Image
                                src="/ppay.svg"
                                alt="p-pay"
                                width={80}
                                height={20}
                                className="mt-auto inline-block h-full"
                            />
                        </Link>
                    </div>
                    <div className="ml-auto hidden items-center justify-center md:flex md:space-x-6 lg:space-x-10">
                        <Link
                            href="#"
                            className="transition duration-300 hover:border-b-2 hover:text-[#00BAF7]"
                        >
                            Features
                        </Link>
                        <Link
                            href="#"
                            className="transition duration-300 hover:border-b-2 hover:text-[#00BAF7]"
                        >
                            Support
                        </Link>
                        <Link
                            href="#"
                            className="transition duration-300 hover:border-b-2 hover:text-[#00BAF7]"
                        >
                            Technology
                        </Link>
                    </div>
                    <div className="ml-auto hidden md:flex md:space-x-5 lg:space-x-6">
                        <Link
                            href="/login"
                            className="flex items-center transition duration-300 hover:text-[#00BAF7]"
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="flex items-center justify-center rounded-lg bg-[#00BAF7] py-[6px] px-3 text-white shadow-lg transition duration-300 hover:-translate-y-1"
                        >
                            Signup
                        </Link>
                    </div>
                    <button
                        className="ml-auto space-y-1 md:hidden"
                        onClick={() => setOpenSidebar(!openSidebar)}
                    >
                        <div
                            className={
                                openSidebar
                                    ? 'h-[3px] w-7 translate-y-[7px] rotate-45 rounded-xl bg-black transition duration-300'
                                    : 'h-[3px] w-7 rounded-xl bg-black transition duration-300'
                            }
                        ></div>
                        <div
                            className={
                                openSidebar
                                    ? 'h-[3px] w-7 rounded-xl bg-black opacity-0 transition duration-300 '
                                    : 'h-[3px] w-7 rounded-xl bg-black transition duration-300'
                            }
                        ></div>
                        <div
                            className={
                                openSidebar
                                    ? 'm-0 h-[3px] w-7 -translate-y-[7px] -rotate-45 rounded-xl bg-black transition duration-300'
                                    : 'h-[3px] w-7 rounded-xl bg-black transition duration-300'
                            }
                        ></div>
                    </button>
                </div>
                <div
                    className={
                        openSidebar
                            ? 'fixed inset-x-0 bottom-0 z-10 flex h-full  flex-col items-center bg-white pt-20 transition duration-1000 md:hidden '
                            : 'fixed inset-x-0 bottom-0 z-10 flex  h-full -translate-y-full flex-col items-center bg-white pt-20 opacity-0 transition duration-1000'
                    }
                >
                    <div className="mb-5 flex w-full flex-col space-y-3">
                        <Link
                            href="#"
                            className="mx-3 py-2 px-6 text-xl transition duration-300 hover:rounded-xl hover:bg-blue-300/10"
                        >
                            Features
                        </Link>
                        <Link
                            href="#"
                            className="mx-3 py-2 px-6 text-xl transition duration-300 hover:rounded-xl hover:bg-blue-300/10"
                        >
                            Support
                        </Link>
                        <Link
                            href="#"
                            className="mx-3 py-2 px-6 text-xl transition duration-300 hover:rounded-xl hover:bg-blue-300/10"
                        >
                            Technology
                        </Link>
                    </div>
                    <hr className="w-[80%] text-center" />
                    <div className="my-10 flex w-full items-center justify-center">
                        <Link
                            href="/login"
                            className="mx-5 flex w-full items-center justify-center rounded-lg bg-black p-3 text-[16px] text-white shadow-lg transition duration-300 hover:-translate-y-1 "
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="mx-5 flex w-full items-center justify-center rounded-lg bg-[#00BAF7] p-3 text-[16px] text-white shadow-lg transition duration-300 hover:-translate-y-1 "
                        >
                            signup
                        </Link>
                    </div>
                </div>
            </nav>
            <main className=" mx-10 h-full pt-32 sm:text-center">
                <div>
                    <h1 className=" text-[30px] font-bold leading-tight sm:text-[40px]">
                        <span>
                            A <span className="text-[#00BAF7]">Simple</span>{' '}
                            E-wallet
                        </span>{' '}
                        <br />
                        for everyday transaction
                    </h1>
                    <p className="text-md mt-4 sm:text-lg">
                        P-pay helps to send and recieve money without
                        unnecessary features and fees, cause am lazy.
                    </p>
                    <Link href="/signup">
                        <button className="my-5 rounded-lg bg-[#00BAF7] py-3 px-10 text-[16px] text-white shadow-lg transition duration-300 hover:-translate-y-1 sm:m-10 ">
                            Get Started for free
                        </button>
                    </Link>
                </div>
                <div className=" absolute bottom-0 right-0 left-0  mb-5 text-center">
                    <h2>A lazy Dev</h2>
                    <p>©2022 All rights reserved.</p>
                </div>
            </main>
        </main>
    );
};

export default Home;
// Basic and secure E-wallet for your everyday transaction
