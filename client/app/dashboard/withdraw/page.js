'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useFormik } from 'formik';
import SelectBank from './utils/selectBank';
import FormOne from './formOne';
import FormTwo from './formTwo';
import FormThree from './formThree';
import Link from 'next/link';

const Page = () => {
    const [form, setForm] = useState(1);
    const [balance, setBalance] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [banks, setBanks] = useState([]);
    const [bankName, setBankName] = useState('Select Bank');
    const [bankCode, setBankCode] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [amount, setAmount] = useState('');

    const handleEffect = async () => {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}user/userDetails`
        );
        const user = await response.data.user;
        let balance = user.balance;
        setBalance(balance);
        const bankRes = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}transfer/getBanks`
        );
        const banks = bankRes.data.banks;
        setBanks(banks);
    };
    useEffect(() => {
        handleEffect();
    }, []);
    return (
        <main className="relative grid h-full w-full grid-cols-1 overflow-auto bg-vector-pattern bg-small px-4 py-8 md:bg-big">
            {showModal ? (
                <SelectBank
                    setShowModal={setShowModal}
                    banks={banks}
                    setBankName={setBankName}
                    setBankCode={setBankCode}
                    showModal={showModal}
                />
            ) : null}
            {form === 1 && (
                <FormOne
                    balance={balance}
                    setShowModal={setShowModal}
                    bankName={bankName}
                    setAccountNumber={setAccountNumber}
                    setAmount={setAmount}
                    accountNumber={accountNumber}
                    amount={amount}
                    bankCode={bankCode}
                    setAccountName={setAccountName}
                    setForm={setForm}
                />
            )}
            {form === 2 && (
                <FormTwo
                    balance={balance}
                    // setShowModal={setShowModal}
                    bankName={bankName}
                    setAccountNumber={setAccountNumber}
                    setAmount={setAmount}
                    accountNumber={accountNumber}
                    amount={amount}
                    bankCode={bankCode}
                    setAccountName={setAccountName}
                    setForm={setForm}
                    accountName={accountName}
                />
            )}
            {form === 3 && (
                <FormThree
                    accountName={accountName}
                    bankName={bankName}
                    accountNumber={accountNumber}
                    amount={amount}
                    bankCode={bankCode}
                    setForm={setForm}
                />
            )}
            <Link
                href="/dashboard"
                className="w-full text-center font-semibold text-secondary underline"
            >
                Go Home
            </Link>
        </main>
    );
};

export default Page;
