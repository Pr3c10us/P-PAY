'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { GrMail } from 'react-icons/gr';
import Image from 'next/image';

const FormTwo = () => {
    return (
        <div
            className="flex h-min w-full flex-col items-center justify-center place-self-center rounded-3xl border
            bg-white p-8 shadow-lg xsm:w-auto"
        >
            <div className="mb-2 space-y-2">
                <Link href="/" className="">
                    <Image
                        width="65"
                        height={28}
                        alt="ppay"
                        src="/ppay-icon.svg"
                        className="inline-block h-min w-8 xsm:w-10"
                        priority
                    />
                </Link>
            </div>
            <div className="mb-6 flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-3xl">
                    <p>Password Reset Complete</p>
                </div>
                <div className="flex max-w-lg flex-col text-sm font-medium text-gray-400 2xsm:text-sm">
                    <p>
                        Your password has been successfully reset. You can now
                        log in to your account using your new password.{' '}
                    </p>
                </div>
            </div>

            <div className="flex w-full flex-col items-center justify-center">
                <div className="flex gap-1 text-center text-base">
                    <Link
                        href="/login"
                        className="flex items-center justify-center gap-1 rounded-xl bg-secondary p-3 text-white shadow-xl transition-all duration-200 hover:-translate-y-1"
                    >
                        <IoMdArrowRoundBack className="text-base" />
                        Go to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FormTwo;
