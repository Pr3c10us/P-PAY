'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { GrMail } from 'react-icons/gr';
import axios from 'axios';

const FormTwo = ({ email, setForm }) => {
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        if (!email) {
            setForm(1);
        }
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const handleResend = async () => {
        try {
            setTimeLeft(60);
            await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}user/forgotPassword?email=${email}`
            );
        } catch (error) {
            if (error.response) {
                const errorMsg = error.response.data.msg;
                formik.setFieldError('code', errorMsg);
            }
        }
    };
    return (
        <div
            className="flex h-min w-full flex-col items-center justify-center place-self-center rounded-3xl
            bg-white p-8 shadow-lg xsm:w-auto"
        >
            <div className="mb-2 space-y-2">
                <GrMail className="inline-block h-min w-12 text-[#00baf7]" />
            </div>
            <div className="mb-6 flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-3xl">
                    <p>Check your mail</p>
                </div>
                <div className="flex flex-col text-[0.75rem] font-medium text-gray-400 2xsm:text-sm">
                    <p>We have sent a password reset link to {`${email}`}</p>
                </div>
            </div>
            <div className="mb-6 flex gap-1 text-center text-base">
                <p>
                    Didn't receive Link?{' '}
                    {timeLeft > 0 ? (
                        <span className="text-[#00baf7]">
                            {'wait ' + timeLeft + 's to resend'}
                        </span>
                    ) : (
                        <button
                            onClick={handleResend}
                            className="text-[#00baf7]"
                        >
                            Resend
                        </button>
                    )}
                </p>
            </div>
            <div className="flex w-full flex-col items-center justify-center">
                <div className="flex gap-1 text-center text-base">
                    <Link
                        href="/login"
                        className="flex items-center gap-1 text-gray-400"
                    >
                        <IoMdArrowRoundBack className="text-base" />
                        Back to login page
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FormTwo;
