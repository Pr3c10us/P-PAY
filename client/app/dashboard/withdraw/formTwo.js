import React, { useEffect, useState } from 'react';
import { RiBankLine } from 'react-icons/ri';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

const FormTwo = ({
    // balance,
    bankName,
    accountName,
    accountNumber,
    amount,
    setForm,
}) => {
    const [date, setDate] = useState('');

    const handleConfirm = async () => {
        setForm(3);
    };

    useEffect(() => {
        const date = new Date();
        setDate(date.toDateString());
    }, []);
    return (
        <div className="relative flex w-full max-w-md flex-col space-y-8 place-self-center rounded-xl border bg-neutral px-4 py-6 font-medium shadow-md sm:justify-center sm:space-y-8 sm:py-10 sm:px-8">
            <BsFillArrowLeftCircleFill
                onClick={() => setForm(1)}
                className="absolute right-4 top-4 h-7 w-7 cursor-pointer text-secondary transition-all duration-200 hover:scale-110"
            />
            <RiBankLine className="h-9 w-8" />
            <h1 className="flex flex-col text-lg text-zinc-500 sm:text-xl">
                Confirm your <br />
                <span className="text-xl font-semibold text-primary sm:text-2xl">
                    {Intl.NumberFormat('en-NG', {
                        style: 'currency',
                        currency: 'NGN',
                    }).format(Number(amount) + 10)}{' '}
                </span>
                Withdrawal
            </h1>
            <div className="">
                <div className="grid w-full grid-cols-4 justify-between border-b px-2 pb-4">
                    <p className="flex items-center text-sm text-gray-500 sm:text-base">
                        To
                    </p>
                    <h2 className="col-span-3 flex w-full flex-col xsm:text-lg">
                        <span className="text-slate-500">{accountNumber}</span>
                        <span className="font-semibold">{accountName} </span>
                        <span className="text-base text-gray-500">
                            {bankName}{' '}
                        </span>
                    </h2>
                </div>
                <div className="grid w-full grid-cols-4 justify-between border-b px-2 py-4">
                    <p className="text-sm text-gray-500 sm:text-base">Date</p>
                    <h2 className="col-span-3 w-full text-lg xsm:text-lg">
                        {date}
                    </h2>
                </div>
            </div>
            <p className="text-center text-[0.75rem] text-gray-400 sm:text-sm">
                By selecting "Confirm", you authorize P-PAY to make this
                transfer.
            </p>
            <button
                onClick={handleConfirm}
                className={`rounded-lg bg-secondary px-6 py-2 text-lg text-white`}
            >
                Confirm
            </button>
        </div>
    );
};

export default FormTwo;
