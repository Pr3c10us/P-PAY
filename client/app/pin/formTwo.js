'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import PinInput from 'react-pin-input';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import axios from 'axios';
import { RxCross2 } from 'react-icons/rx';

const FormTwo = ({ pin, form, setForm, setPin }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmPin, setConfirmPin] = useState('');
    const [showError, setShowError] = useState(false);
    const [confirmError, setConfirmError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        if (!confirmPin) {
            return setConfirmError('Reenter your Pin');
        }
        setConfirmError('');
        setIsSubmitting(true);
        if (confirmPin !== pin) {
            setConfirmError('Pin does not match');
            setIsSubmitting(false);
            return;
        }
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}user/pin?pin=${pin}&isNew=yes`,
                {
                    withCredentials: true,
                }
            );
            setSuccessMsg(res.data.msg);
            setShowError(true);
            setTimeout(() => {
                setIsSubmitting(false);
                router.push('dashboard');
            }, 2000);
        } catch (error) {
            if (error.response) {
                const errorMsg = error.response.data.msg;
                setConfirmError(errorMsg);
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div
            className={`absolute flex h-min w-auto flex-col place-self-center rounded-xl border
            bg-white py-12 px-3 shadow-lg  transition-all duration-75 2xsm:p-12 `}
        >
            <div
                className={
                    showError
                        ? `fixed top-6 left-2 right-2 z-50 m-auto flex max-w-[12rem] items-center justify-between  gap-4 rounded-xl border-2 border-secondary bg-white px-4 py-3  text-black transition-all  duration-500 sm:w-auto`
                        : `fixed right-2 top-6 left-2 z-50 m-auto flex max-w-[12rem] scale-0 items-center justify-between gap-4 rounded-xl border-2 border-secondary bg-white px-4 py-3 text-black  opacity-0 transition-all  duration-500 sm:w-auto`
                }
                role="alert"
            >
                <div className="flex items-center space-x-1 text-left text-sm  xsm:text-base">
                    <span className={`inline text-xl font-bold capitalize `}>
                        {successMsg}
                    </span>
                </div>
                <RxCross2
                    onClick={() => setShowError(false)}
                    className={` aspect-square cursor-pointer  rounded-full border-2 border-secondary bg-white p-1 text-3xl text-black xsm:text-4xl xsm:text-3xl`}
                />
            </div>
            <button
                type="button"
                onClick={() => {
                    setForm(1);
                    setPin('');
                }}
                className="absolute top-2 left-4 flex rounded-full border border-gray-50 p-2 text-secondary shadow-lg transition-all duration-300 hover:scale-110"
            >
                <IoMdArrowRoundBack className="text-xl" />
            </button>
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
                <p>Confirm your Pin</p>
            </div>
            <div className="relative flex h-full w-full items-center justify-center">
                <PinInput
                    focus
                    length={4}
                    initialValue=""
                    onChange={(value, index) => {
                        setConfirmPin('');
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
                        setConfirmPin(value);
                    }}
                    autoSelect={true}
                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                />
            </div>
            <p className="col-span-2 mt-11 ml-1 min-h-[2.2rem] w-full text-[0.7rem] font-semibold text-red-500 xsm:mt-1 xsm:text-sm">
                {confirmError ? (
                    <span className="flex items-center justify-center gap-1">
                        <BsFillExclamationTriangleFill className="text-base 2xsm:text-sm" />
                        {`${confirmError}`}
                    </span>
                ) : (
                    ''
                )}
            </p>{' '}
            <div className="flex w-full flex-col items-center justify-center space-y-4">
                <button
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="flex h-12 w-full items-center justify-center rounded-lg bg-secondary text-base text-white focus:outline-none"
                >
                    {isSubmitting ? <PulseLoader color="white" /> : 'Submit'}
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

export default FormTwo;
