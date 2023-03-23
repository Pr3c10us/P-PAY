'use client';
import { useRouter } from 'next/navigation';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsArrowRightShort } from 'react-icons/bs';
import BalanceBarChart from './utils/barChart';

const Top = ({ user, balance }) => {
    const router = useRouter();
    return (
        <article
            className={`flex max-w-3xl w-full flex-col items-center justify-center px-4 xsm:px-12 sm:flex-row sm:items-center sm:justify-around`}
        >
            <div className="flex items-center gap-x-2 p-4 sm:flex-col sm:items-start sm:gap-y-4">
                Welcome
                <span className="text-2xl font-semibold text-primary">
                    @{user.username}
                </span>
            </div>
            <div className="flex w-full flex-col space-y-4 rounded-md bg-gradient-to-l from-black to-secondary py-4 text-white sm:w-[350px]">
                <div className="flex w-full px-4">
                    <div className="flex w-full flex-col gap-2 text-neutral">
                        <p className="text-lg font-medium">Current Balance :</p>
                        <h1 className="flex w-full justify-end gap-[2px] text-right text-[1.75rem] font-medium xsm:text-3xl">
                            ₦
                            <span className="">
                                {balance[0]}.{balance[1] || '00'}
                                {/* 999,999,999.99 */}
                            </span>
                        </h1>
                    </div>
                    {/* <div className="flex h-full w-full flex-col items-center justify-between py-2 px-2">
                        <BalanceBarChart />
                    </div> */}
                </div>
                <div className="lg:px-800 font-medium flex w-full items-center justify-center gap-x-4 px-4 xsm:gap-x-8">
                    <button
                        onClick={() => router.push('/dashboard/addMoney')}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-1 text-neutral   [&>div]:hover:rotate-180"
                    >
                        <div className="transition-all duration-200">
                            <AiOutlinePlus />
                        </div>
                        Add money
                    </button>
                    <button
                        onClick={() => router.push('/dashboard/withdraw')}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral py-1 text-black [&>div]:hover:translate-x-1"
                    >
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
