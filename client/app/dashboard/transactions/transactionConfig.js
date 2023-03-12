import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';

const TransactionConfig = ({
    transactionType,
    setTransactionType,
    period,
    setPeriod,
}) => {
    const typeRef = useRef(null);
    const periodRef = useRef(null);
    const [showType, setShowType] = useState(false);
    const [showPeriod, setShowPeriod] = useState(false);

    // Sample transaction data
    const handleEffect = async () => {
        const handleClickOutsidePeriod = (event) => {
            if (
                periodRef.current &&
                !periodRef.current.contains(event.target)
            ) {
                setShowPeriod(false);
            }
        };
        const handleClickOutsideType = (event) => {
            if (typeRef.current && !typeRef.current.contains(event.target)) {
                setShowType(false);
            }
        };

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutsidePeriod);
        document.addEventListener('mousedown', handleClickOutsideType);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutsidePeriod);
            document.removeEventListener('mousedown', handleClickOutsideType);
        };
    };
    useEffect(() => {
        handleEffect();
    }, [typeRef, periodRef]);

    return (
        <div className="top-24 flex w-full flex-col items-center xl:sticky xl:max-w-sm">
            <h1 className=" w-full max-w-xl text-left text-lg xsm:text-2xl xl:max-w-sm">
                Filters
            </h1>
            <section className="mt-2 mb-8 flex w-full max-w-xl items-center justify-between gap-x-4 gap-y-8 rounded-xl px-8 md:justify-around xl:h-min xl:max-w-sm xl:flex-col xl:items-start xl:justify-start">
                <div ref={typeRef} className="relative w-full">
                    <h3 className="text-[0.7rem] xsm:text-sm md:text-base">
                        Transaction Type
                    </h3>
                    <button
                        onClick={() => setShowType(!showType)}
                        className={`flex w-full items-center justify-between rounded-md border-2 transition-all duration-300 ${
                            showType && 'border-secondary'
                        } py-1 px-2 capitalize xsm:py-1.5 xsm:text-lg   md:text-xl`}
                    >
                        {transactionType}{' '}
                        <AiOutlineCaretDown
                            className={`text-sm transition-all duration-300 ${
                                showType
                                    ? '-rotate-180 text-secondary'
                                    : 'rotate-0 text-gray-400'
                            }`}
                        />
                    </button>
                    <div
                        className={`absolute z-50 flex w-full translate-y-1 flex-col overflow-hidden rounded-md border bg-white shadow-lg transition-all duration-300 ${
                            showType
                                ? 'h-[108px] 2xsm:h-[120px] xsm:h-[132px]'
                                : 'h-0 border-none'
                        }`}
                    >
                        <button
                            onClick={() => {
                                setShowType(false);
                                setTransactionType('both');
                            }}
                            className={`flex w-full py-2 px-2 text-sm 2xsm:text-base xsm:text-lg md:text-xl ${
                                transactionType === 'both'
                                    ? 'bg-secondary bg-opacity-10'
                                    : 'hover:bg-secondary hover:bg-opacity-[0.03]'
                            }`}
                        >
                            Both
                        </button>
                        <button
                            onClick={() => {
                                setShowType(false);
                                setTransactionType('debit');
                            }}
                            className={`flex w-full py-2 px-2 text-sm 2xsm:text-base xsm:text-lg md:text-xl ${
                                transactionType === 'debit'
                                    ? 'bg-secondary bg-opacity-10'
                                    : 'hover:bg-secondary hover:bg-opacity-[0.03]'
                            }`}
                        >
                            Debit
                        </button>
                        <button
                            onClick={() => {
                                setShowType(false);
                                setTransactionType('credit');
                            }}
                            className={`flex w-full py-2 px-2 text-sm 2xsm:text-base xsm:text-lg md:text-xl ${
                                transactionType === 'credit'
                                    ? 'bg-secondary bg-opacity-10'
                                    : 'hover:bg-secondary hover:bg-opacity-[0.03]'
                            }`}
                        >
                            Credit
                        </button>
                    </div>
                    <div></div>
                </div>
                <div ref={periodRef} className="relative w-full">
                    <h3 className="text-[0.7rem] xsm:text-sm md:text-base">
                        Time Period
                    </h3>
                    <button
                        onClick={() => setShowPeriod(!showPeriod)}
                        className={`flex w-full items-center justify-between rounded-md border-2 transition-all duration-300 ${
                            showPeriod && 'border-secondary'
                        } py-1 px-2 capitalize xsm:py-1.5 xsm:text-lg   md:text-xl`}
                    >
                        {period}{' '}
                        <AiOutlineCaretDown
                            className={`text-sm transition-all duration-300 ${
                                showPeriod
                                    ? '-rotate-180 text-secondary'
                                    : 'rotate-0 text-gray-400'
                            }`}
                        />
                    </button>
                    <div
                        className={`absolute z-50 flex w-full translate-y-1 flex-col overflow-hidden rounded-md border bg-white shadow-lg transition-all duration-300 ${
                            showPeriod
                                ? 'h-[180px] 2xsm:h-[200px] xsm:h-[220px]'
                                : 'h-0 border-none'
                        }`}
                    >
                        <button
                            onClick={() => {
                                setPeriod('today');
                                setShowPeriod(false);
                            }}
                            className={`flex w-full py-2 px-2 text-sm 2xsm:text-base xsm:text-lg md:text-xl ${
                                period === 'today'
                                    ? 'bg-secondary bg-opacity-10'
                                    : 'hover:bg-secondary hover:bg-opacity-[0.03]'
                            }`}
                        >
                            Today
                        </button>
                        <button
                            onClick={() => {
                                setPeriod('yesterday');
                                setShowPeriod(false);
                            }}
                            className={`flex w-full py-2 px-2 text-sm 2xsm:text-base xsm:text-lg md:text-xl ${
                                period === 'yesterday'
                                    ? 'bg-secondary bg-opacity-10'
                                    : 'hover:bg-secondary hover:bg-opacity-[0.03]'
                            }`}
                        >
                            Yesterday
                        </button>
                        <button
                            onClick={() => {
                                setPeriod('past week');
                                setShowPeriod(false);
                            }}
                            className={`flex w-full py-2 px-2 text-sm 2xsm:text-base xsm:text-lg md:text-xl ${
                                period === 'past week'
                                    ? 'bg-secondary bg-opacity-10'
                                    : 'hover:bg-secondary hover:bg-opacity-[0.03]'
                            }`}
                        >
                            Past Week
                        </button>
                        <button
                            onClick={() => {
                                setPeriod('past month');
                                setShowPeriod(false);
                            }}
                            className={`flex w-full py-2 px-2 text-sm 2xsm:text-base xsm:text-lg md:text-xl ${
                                period === 'past month'
                                    ? 'bg-secondary bg-opacity-10'
                                    : 'hover:bg-secondary hover:bg-opacity-[0.03]'
                            }`}
                        >
                            Past Month
                        </button>
                        <button
                            onClick={() => {
                                setPeriod('all time');
                                setShowPeriod(false);
                            }}
                            className={`flex w-full py-2 px-2 text-sm 2xsm:text-base xsm:text-lg md:text-xl ${
                                period === 'all time'
                                    ? 'bg-secondary bg-opacity-10'
                                    : 'hover:bg-secondary hover:bg-opacity-[0.03]'
                            }`}
                        >
                            All Time
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TransactionConfig;
