'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PinInput from 'react-pin-input';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import axios from 'axios';

const FormTwo = ({
    setForm,
    accountName,
    bankName,
    accountNumber,
    amount,
    bankCode,
}) => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const handleContinue = async () => {
        if (!pin) {
            return setError('Provide 4 digits pin');
        }

        const body = {
            pin,
            name: accountName,
            account_number: accountNumber,
            bank_code: bankCode,
            amount,
        };
        try {
            axios.defaults.withCredentials = true;
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}transfer/withdraw`,
                body
            );
            setForm(4);
        } catch (error) {
            setForm(5);
            return;
        }
    };

    return (
        <div
            className={`relative flex h-min w-auto flex-col place-self-center rounded-xl border
            bg-white py-8 px-3 shadow-lg  transition-all duration-75 2xsm:p-12 `}
        >
            <BsFillArrowLeftCircleFill
                onClick={() => setForm(2)}
                className="absolute right-4 top-4 h-7 w-7 cursor-pointer text-secondary transition-all duration-200 hover:scale-110"
            />
            <div className="mb-4">
                <Link href="/" className="">
                    <Image
                        src="/ppay.svg"
                        width={50}
                        height={50}
                        alt="p-pay"
                        className="w-28"
                        priority
                    />
                </Link>
            </div>
            <div className="mb-12 text-2xl xsm:mb-6">
                <p>Enter Pin</p>
            </div>
            <div className="flex h-full w-full items-center justify-center">
                <PinInput
                    length={4}
                    secret
                    focus
                    initialValue=""
                    onChange={(value, index) => {
                        setPin('');
                    }}
                    type="numeric"
                    inputMode="number"
                    style={{
                        padding: '10px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.2rem',
                    }}
                    inputStyle={{
                        borderColor: '#bdbdbd',
                        borderRadius: '0.5rem',
                        borderWidth: '1px',
                        width: '3rem',
                    }}
                    inputFocusStyle={{
                        borderColor: '#54428E',
                        borderWidth: '2px',
                    }}
                    onComplete={(value, index) => {
                        setPin(value);
                        setError('');
                    }}
                    autoSelect={true}
                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                />
            </div>
            <p className="col-span-2 mt-11 ml-1 min-h-[2.2rem] w-full text-[0.7rem] font-semibold text-red-500 xsm:mt-1 xsm:text-sm">
                {error ? (
                    <span className="flex items-center justify-center gap-1">
                        <BsFillExclamationTriangleFill className="text-base 2xsm:text-sm" />
                        {`${error}`}
                    </span>
                ) : (
                    ''
                )}
            </p>{' '}
            <div className="flex w-full flex-col items-center justify-center space-y-4">
                <button
                    onClick={handleContinue}
                    className="flex h-12 w-full items-center justify-center rounded-lg bg-secondary text-base text-white focus:outline-none"
                >
                    Withdraw
                </button>
            </div>
            {/* <Link
                href="/dashboard/home"
                className="mt-4 flex w-full items-center justify-center gap-1 text-center text-base text-gray-400"
            >
                <IoMdArrowRoundBack className="text-base" />
                Back to Dashboard
            </Link> */}
        </div>
    );
};

export default FormTwo;
