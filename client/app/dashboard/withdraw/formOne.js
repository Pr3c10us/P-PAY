import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { SlOptions } from 'react-icons/sl';
import axios from 'axios';

const FormOne = ({
    balance,
    setShowModal,
    bankName,
    setAccountNumber,
    setAmount,
    accountNumber,
    amount,
    bankCode,
    setAccountName,
    setForm,
}) => {
    const [name, setName] = useState('');
    const newBal = balance.toLocaleString().split('.');
    const [errorMsg, setErrorMsg] = useState('');
    const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {}, []);

    const handleCheckAccount = async () => {
        if (!bankCode || !accountNumber || accountNumber.length < 10) {
            setDisableButton(true);
            setName('');
            return;
        }
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}transfer/verifyAccount?account_number=${accountNumber}&bank_code=${bankCode}`
            );
            const data = res.data;
            setName(data.account_name);
            setDisableButton(false);
        } catch (error) {
            setName('');
            setDisableButton(true);
            return;
        }
        if (amount.length <= 0) {
            setDisableButton(true);
            return;
        }
    };
    useEffect(() => {
        handleCheckAccount();
    }, [accountNumber, bankCode, amount]);

    const handleProceed = async () => {
        setAmount(amount);
        if (Number(amount) + 10 > balance) {
            // setDisableButton(true)
            return setErrorMsg("You can't withdraw more than you have");
        } else {
            setErrorMsg('');
        }

        setAccountName(name);
        return setForm(2);
    };

    return (
        <div className="flex w-full max-w-md flex-col place-self-center rounded-lg border-2 bg-neutral p-8 shadow-lg">
            <div className="mb-8 space-y-4">
                <Image
                    src="/ppay.svg"
                    width={50}
                    height={50}
                    alt="p-pay"
                    className="w-28"
                    priority
                />
                <h1 className="text-2xl font-semibold lg:text-3xl">
                    Withdraw Funds
                </h1>
                <div className="flex w-full items-center justify-around gap-4 rounded-lg bg-gradient-to-r from-secondary to-primary p-4 text-neutral lg:p-6">
                    <p className="text-base lg:text-lg">Current Balance</p>
                    <h1 className="flex w-min gap-[2px]">
                        ₦
                        <span className="text-xl xsm:text-2xl lg:text-3xl">
                            {}
                            {newBal[0]}.{newBal[1] || '00'}
                        </span>
                    </h1>
                </div>
            </div>

            <div className="mb-8">
                <button
                    onClick={() => setShowModal(true)}
                    className="flex w-full items-center justify-between rounded-md border-2 border-secondary py-2 px-3 text-left text-lg font-medium shadow-md outline-none transition-all duration-300 active:shadow-none xsm:min-w-[19rem] md:min-w-0"
                >
                    {bankName} <SlOptions className="text-secondary" />
                </button>
            </div>
            <div className="mb-6">
                <input
                    type="tel"
                    name="accountNumber"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Account Number"
                    maxLength={10}
                    className="block w-full rounded-md border-2 py-2 px-3 text-lg outline-none transition-all duration-300 focus:border-secondary focus:outline-none xsm:min-w-[19rem] md:min-w-0"
                />
                <p className="h-2 text-right text-sm font-semibold text-secondary">
                    {name}
                </p>
            </div>
            <div className="relative mt-1">
                <div className="pointer-events-none absolute top-[0.85rem] left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">₦</span>
                </div>
                <input
                    type="number"
                    name="amount"
                    className="block w-full rounded-md border-2 py-2 px-7 text-lg outline-none transition-all duration-300 focus:border-secondary focus:outline-none xsm:min-w-[19rem] md:min-w-0"
                    placeholder="Amount"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    autoComplete="off"
                />
                <p className=" mt-1 text-right text-[0.75rem] font-medium capitalize text-gray-400">
                    fee: ₦10.00
                </p>
            </div>
            <p className="mb-6 mt-2 h-4 text-center text-sm font-semibold text-red-500">
                {errorMsg}
            </p>

            <div className="w-full">
                <button
                    onClick={handleProceed}
                    disabled={disableButton}
                    className={`w-full rounded-lg bg-secondary py-2 text-lg text-neutral transition-all duration-200 ${
                        disableButton ? 'bg-opacity-50' : ''
                    }`}
                >
                    Proceed
                </button>
            </div>
        </div>
    );
};

export default FormOne;
