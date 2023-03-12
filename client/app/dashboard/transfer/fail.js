import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Fail = ({ errorMsg, setForm }) => {
    return (
        <div className="flex w-full max-w-[20rem] flex-col items-center space-y-14 place-self-center rounded-xl border px-2 py-10 font-medium shadow-md xsm:justify-center xsm:space-y-14 xsm:py-10 xsm:px-8 sm:max-w-sm">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-500 xsm:h-24 xsm:w-24 ">
                <FaTimes className="z-50 text-2xl text-white" />
            </div>
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-semibold xsm:text-2xl">Failed</h1>
                <p className="text-gray-500">{errorMsg}</p>
            </div>
            <button
                onClick={() => setForm(2)}
                className="rounded-lg bg-red-500 py-2 px-8 text-lg text-white xsm:text-xl"
            >
                Try Again
            </button>
        </div>
    );
};

export default Fail;
