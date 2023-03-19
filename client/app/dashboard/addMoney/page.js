'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PaystackButton } from 'react-paystack';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

const Page = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');

    const handleEffect = async () => {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}user/userDetails`
        );
        const user = res.data.user;
        setEmail(user.email);
    };

    useEffect(() => {
        handleEffect();
    }, []);
    const componentProps = {
        email,
        amount: Number(amount) * 100,
        publicKey: `${process.env.NEXT_PUBLIC_PAYSTACK_KEY}`,
        text: 'Add money',
        onSuccess: (res) => {
            axios
                .get(
                    `${process.env.NEXT_PUBLIC_API_URL}transfer/fund/${res.reference}`
                )
                .then((res) => {
                    router.push('/dashboard/');
                })
                .catch((error) => {
                    console.log(error);
                });
            return;
        },
        // onClose: () => alert("Wait! Don't leave :("),
    };

    return (
        <div className="grid h-full w-full bg-vector-pattern bg-small px-4 md:bg-big ">
            <div className="relative flex w-full max-w-4xl items-center place-self-center rounded-lg border-2 bg-neutral shadow-lg xsm:w-auto md:h-96 md:w-full">
                <BsFillArrowLeftCircleFill
                    onClick={() => router.push('/dashboard/')}
                    className="absolute right-4 top-4 h-7 w-7 cursor-pointer text-secondary transition-all duration-200 hover:scale-110"
                />
                <div className=" flex h-full w-full flex-1 flex-col items-start justify-center space-y-4 py-8 px-4 md:items-start">
                    <Image
                        src="/ppay.svg"
                        width={50}
                        height={50}
                        alt="p-pay"
                        className="mb-4 w-28"
                        priority
                    />
                    <h1 className="text-2xl font-semibold lg:text-3xl">
                        Fund your wallet
                    </h1>
                    <div className="flex w-full flex-col justify-center space-y-4">
                        <div className="w-full">
                            <label
                                htmlFor="amount"
                                className="block text-sm font-medium leading-6 text-gray-900 "
                            >
                                Enter Amount
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-gray-500 sm:text-sm">
                                        ₦
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    className="block w-full rounded-md border-2 py-1.5 px-7 outline-none transition-all duration-300 focus:border-secondary focus:outline-none xsm:min-w-[19rem] md:min-w-0"
                                    placeholder="0.00"
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                    value={amount}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <PaystackButton
                                {...componentProps}
                                className="rounded-md bg-secondary px-4 py-2 text-sm text-white lg:text-base"
                            />
                        </div>
                    </div>
                </div>

                <div className="hidden h-full w-full flex-1 px-4 md:flex">
                    <Image
                        src="/undraw_vault.svg"
                        width={640}
                        height={480}
                        alt="leaf"
                        className="object-fit h-full w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default Page;
