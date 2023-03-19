import React from 'react';
import { AiOutlineRise, AiOutlineFall } from 'react-icons/ai';

const MidTotal = ({ totalReceived, totalSpent }) => {
    return (
        <article className="flex w-full justify-center px-2 xsm:px-12">
            <div className="flex w-full max-w-3xl items-center justify-around gap-4 rounded-xl bg-gradient-to-l from-black to-secondary px-4 py-4 xsm:min-w-[350px] xsm:flex-row">
                <div className="flex items-center gap-2 text-neutral xsm:gap-x-4">
                    <div className="space-y-2 lg:space-y-4">
                        <p className="flex items-center justify-between text-[0.7rem] xsm:text-[0.75rem] sm:text-sm">
                            Total Received
                            <AiOutlineRise className="text-2xl xsm:text-4xl lg:hidden" />
                        </p>
                        <h1 className="flex w-min gap-1 text-[0.75rem] sm:text-sm">
                            ₦
                            <span className="text-base xsm:text-xl sm:text-2xl">
                                {totalReceived[0]}.{totalReceived[1] || '00'}
                            </span>
                        </h1>
                    </div>
                    <AiOutlineRise className="hidden text-4xl lg:block sm:text-6xl" />
                </div>{' '}
                <div className="flex items-center justify-end gap-x-4 text-neutral">
                    <div className="space-y-2 lg:space-y-4">
                        <p className="flex items-center justify-between text-[0.7rem] xsm:text-[0.75rem] sm:text-sm">
                            Total Spent
                            <AiOutlineFall className="text-2xl xsm:text-4xl lg:hidden" />
                        </p>
                        <h1 className="flex w-min gap-1 text-[0.75rem] sm:text-sm">
                            ₦
                            <span className="text-base xsm:text-xl sm:text-2xl">
                                {totalSpent[0]}.{totalSpent[1] || '00'}
                            </span>
                        </h1>
                    </div>
                    <AiOutlineFall className="hidden text-4xl lg:block sm:text-6xl" />
                </div>{' '}
            </div>
        </article>
    );
};

export default MidTotal;
