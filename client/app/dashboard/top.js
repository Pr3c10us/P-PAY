'use client';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsArrowRightShort } from 'react-icons/bs';
import BalanceBarChart from './utils/barChart';

const Top = ({ user, balance }) => {
    return (
        <article
            className={` flex w-full flex-col items-center justify-center px-2 xsm:px-12 sm:flex-row sm:items-center sm:justify-around`}
        >
            <div className="flex items-center gap-x-2 p-4 sm:flex-col sm:items-start sm:gap-y-4">
                Welcome
                <span className="text-2xl font-semibold text-primary">
                    @{user.username}
                </span>
            </div>
            <div className="flex w-full flex-col rounded-md bg-gradient-to-bl from-black to-secondary py-4  text-white sm:w-[350px]">
                <div className="flex w-full ">
                    <div className="ml-4 flex w-full flex-col justify-start gap-6">
                        <p className="text-sm">Current Balance</p>
                        <h1 className="flex w-min gap-1">
                            ₦
                            <span className="text-2xl">
                                {balance[0]}.{balance[1] || '00'}
                            </span>
                        </h1>
                    </div>
                    <div className="flex h-full w-full flex-col items-center justify-between py-2 px-4">
                        <BalanceBarChart />
                    </div>
                </div>
                <div className="flex w-full items-center justify-center gap-x-4 px-4 xsm:gap-x-8 xsm:px-8">
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-1 text-neutral   [&>div]:hover:rotate-180">
                        <div className="transition-all duration-200">
                            <AiOutlinePlus />
                        </div>
                        Add money
                    </button>
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral py-1 text-black [&>div]:hover:translate-x-1">
                        Withdraw{' '}
                        <div className="transition-all duration-300">
                            <BsArrowRightShort />
                        </div>
                    </button>
                </div>
            </div>
        </article>
    );
};

export default Top;
