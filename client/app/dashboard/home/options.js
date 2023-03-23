'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CgHomeAlt } from 'react-icons/cg';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { IoLogOut, IoReceipt } from 'react-icons/io5';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';

const Options = () => {
    return (
        <ul
            className={`mt-4 grid w-full flex-1 grid-cols-3 flex-col gap-x-4 sm:gap-x-8 gap-y-4 px-4 sm:grid-cols-3 md:hidden`}
        >
            <div className='flex items-center justify-center w-full h-full'>
                <li
                    onClick={() => {
                        router.push('/dashboard/transfer');
                    }}
                    className={` flex w-full cursor-pointer gap-y-1 items-center justify-center gap-x-2 flex-col py-2 px-4 text-base`}
                >
                    <AiFillDollarCircle className="rounded-2xl border-2 p-1 text-secondary border-secondary w-8 h-8" />
                    <p className="text-sm xsm:text-lg">Send Money</p>
                </li>
            </div>
            <div className='flex items-center justify-center w-full h-full'>
                <li
                    onClick={() => {
                        router.push('/dashboard/transactions');
                    }}
                    className={`flex w-full cursor-pointer gap-y-1 items-center justify-center gap-x-2 flex-col py-2 px-4 text-base `}
                >
                    <IoReceipt className="rounded-2xl border-2 p-1 text-secondary border-secondary w-8 h-8" />
                    <p className="2xsm:text-sm text-xs xsm:text-lg">Transactions</p>
                    {/* IoReceipt */}
                </li>
            </div>
            <div className='flex items-center sm:col-span-1 justify-center w-full h-full'>
                <li
                    onClick={() => {
                        router.push('/dashboard/profile');
                    }}
                    className={`flex w-min sm:w-full cursor-pointer gap-y-1 items-center justify-center gap-x-2 flex-col py-2 px-4 text-base`}
                >
                    <FaUserCircle className="rounded-2xl border-2 p-1 text-secondary border-secondary w-8 h-8" />
                    <p className="text-sm xsm:text-lg">Profile</p>
                </li>
            </div>
        </ul>
    );
};

export default Options;
