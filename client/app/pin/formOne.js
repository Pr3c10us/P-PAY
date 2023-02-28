'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PinInput from 'react-pin-input';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

const FormOne = ({ setForm, pin, setPin }) => {
    const [error, setError] = useState('');

    const handleContinue = () => {
        if (!pin) {
            return setError('Provide 4 digits pin.');
        }
        setForm(2);
        setError('');
    };

    return (
        <div
            className={`absolute flex h-min w-auto flex-col place-self-center rounded-3xl border
            bg-white py-8 px-3 shadow-lg  transition-all duration-75 2xsm:p-12 `}
        >
            <div className="mb-2">
                <Link href="/" className="">
                    <Image
                        width="65"
                        height={28}
                        alt="ppay"
                        src="/ppay.svg"
                        className="inline-block h-min w-32 xsm:w-28"
                        priority
                    />
                </Link>
            </div>
            <div className="mb-12 text-2xl xsm:mb-6">
                <p>Create Pin</p>
            </div>
            <div className="flex h-full w-full items-center justify-center">
                <PinInput
                    length={4}
                    // secret
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
                    Continue
                </button>
            </div>
            <Link
                href="/dashboard"
                className="mt-4 flex w-full items-center justify-center gap-1 text-center text-base text-gray-400"
            >
                <IoMdArrowRoundBack className="text-base" />
                Back to Dashboard
            </Link>
        </div>
    );
};

export default FormOne;
