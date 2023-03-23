'use client';

import { AiFillDollarCircle } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { IoReceipt } from 'react-icons/io5';
import { usePathname, useRouter } from 'next/navigation';

const Options = () => {
    const router = useRouter();
    return (
        <ul
            className={`mt-4 grid w-full flex-1 grid-cols-3 flex-col gap-x-4 gap-y-4 px-4 sm:grid-cols-3 sm:gap-x-8 md:hidden`}
        >
            <div className="flex h-full w-full items-center justify-center">
                <li
                    onClick={() => {
                        router.push('/dashboard/transfer');
                    }}
                    className={` flex w-full cursor-pointer flex-col items-center justify-center gap-y-1 gap-x-2 py-2 px-4 text-base`}
                >
                    <AiFillDollarCircle className="h-8 w-8 rounded-2xl border-2 border-secondary p-1 text-secondary" />
                    <p className="text-sm xsm:text-lg">Transfer</p>
                </li>
            </div>
            <div className="flex h-full w-full items-center justify-center">
                <li
                    onClick={() => {
                        router.push('/dashboard/transactions');
                    }}
                    className={`flex w-full cursor-pointer flex-col items-center justify-center gap-y-1 gap-x-2 py-2 px-4 text-base `}
                >
                    <IoReceipt className="h-8 w-8 rounded-2xl border-2 border-secondary p-1 text-secondary" />
                    <p className="text-xs 2xsm:text-sm xsm:text-lg">
                        Transactions
                    </p>
                    {/* IoReceipt */}
                </li>
            </div>
            <div className="flex h-full w-full items-center justify-center sm:col-span-1">
                <li
                    onClick={() => {
                        router.push('/dashboard/profile');
                    }}
                    className={`flex w-min cursor-pointer flex-col items-center justify-center gap-y-1 gap-x-2 py-2 px-4 text-base sm:w-full`}
                >
                    <FaUserCircle className="h-8 w-8 rounded-2xl border-2 border-secondary p-1 text-secondary" />
                    <p className="text-sm xsm:text-lg">Profile</p>
                </li>
            </div>
        </ul>
    );
};

export default Options;
