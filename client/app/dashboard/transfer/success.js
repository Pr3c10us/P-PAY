import { useRouter } from 'next/navigation';
import React from 'react';
import { BsCheckLg } from 'react-icons/bs';

const Success = () => {
    const router = useRouter();
    return (
        <div className="flex bg-neutral border-t-4 border-t-secondary w-full max-w-[20rem] flex-col items-center space-y-14 place-self-center rounded-xl border px-2 py-10 font-medium shadow-md xsm:justify-center xsm:space-y-14 xsm:py-10 xsm:px-8 sm:max-w-sm">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-400 xsm:h-24 xsm:w-24 ">
                <div className="absolute flex h-40 w-40 animate-wiggle items-center justify-center rounded-full bg-emerald-400 bg-opacity-25 xsm:h-40 xsm:w-40">
                    <div className="flex h-32 w-32 animate-wiggle items-center justify-center rounded-full bg-emerald-400 bg-opacity-40 xsm:h-32 xsm:w-32"></div>
                </div>
                <BsCheckLg className="z-50 text-2xl text-white" />
            </div>
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-semibold xsm:text-2xl">Success</h1>
                <p className="text-gray-400">Transfer Successful</p>
            </div>
            <button
                onClick={() => router.push('/dashboard/home')}
                className=" rounded-lg bg-secondary py-2 px-8 text-lg text-white focus:outline-none xsm:text-xl"
            >
                Continue
            </button>
        </div>
    );
};

export default Success;
