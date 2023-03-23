import React, { useEffect, useState } from 'react';
import { RiBankLine } from 'react-icons/ri';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import axios from 'axios';

const FormThree = ({
    username,
    amount,
    name,
    user,
    setForm,
    pin,
    setErrorMsg,
}) => {
    const [date, setDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleConfirm = async () => {
        try {
            setIsSubmitting(true);
            const body = {
                pin,
                receiver: username,
                amount,
            };
            // console.log(body);
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}transfer`,
                body
            );
            setForm(4);
        } catch (error) {
            if (error.response) {
                const errorMsg = error.response.data.msg;
                setErrorMsg(errorMsg);
                setForm(5);
            }
        }
    };

    useEffect(() => {
        const date = new Date();
        setDate(date.toDateString());
    }, []);
    return (
        <div className=" relative flex w-full max-w-md flex-col space-y-8 place-self-center rounded-xl border-2  bg-neutral px-4 py-6 font-medium shadow-md sm:justify-center sm:space-y-8 sm:py-10 sm:px-8">
            <BsFillArrowLeftCircleFill
                onClick={() => setForm(2)}
                className="absolute right-4 top-4 h-7 w-7 cursor-pointer text-secondary transition-all duration-200 hover:scale-110"
            />
            <RiBankLine className="h-9 w-8" />
            <h1 className="text-lg text-zinc-500 sm:text-xl">
                Confirm your <br />
                <span className="text-xl font-semibold text-primary sm:text-2xl">
                    {Intl.NumberFormat('en-NG', {
                        style: 'currency',
                        currency: 'NGN',
                    }).format(amount)}{' '}
                </span>
                transfer
            </h1>
            <div className="grid w-full grid-cols-4 justify-between border-b py-2">
                <p className="text-sm text-gray-500 sm:text-base">From</p>
                <h2 className="col-span-3 w-full text-lg xsm:text-xl">
                    @{user.username}
                </h2>
            </div>
            <div className="grid w-full grid-cols-4 justify-between border-b py-2">
                <p className="text-sm text-gray-500 sm:text-base">To</p>
                <h2 className="col-span-3 w-full text-lg xsm:text-xl">
                    @{username}{' '}
                    <span className="text-[0.75rem] text-slate-500 sm:text-sm">
                        ({name}){' '}
                    </span>
                </h2>
            </div>
            <div className="grid w-full grid-cols-4 justify-between border-b py-2">
                <p className="text-sm text-gray-500 sm:text-base">Date</p>
                <h2 className="col-span-3 w-full text-lg xsm:text-lg">
                    {date}
                </h2>
            </div>
            <p className="text-center text-[0.75rem] text-gray-400 sm:text-sm">
                By selecting "Confirm", you authorize P-PAY to make this
                transfer.
            </p>
            <button
                disabled={isSubmitting}
                onClick={handleConfirm}
                className={`rounded-lg bg-secondary px-6 py-2 text-lg text-white ${
                    isSubmitting ? 'bg-opacity-50' : ''
                }`}
            >
                Confirm
            </button>
        </div>
    );
};

export default FormThree;
