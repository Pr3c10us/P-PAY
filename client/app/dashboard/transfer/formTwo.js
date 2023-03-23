import React, { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { HiInformationCircle } from 'react-icons/hi';
import axios from 'axios';
import { BsArrowRightShort } from 'react-icons/bs';

const FormTwo = ({ name, setAmount, amount, setForm, user, setPin }) => {
    const [formattedAmount, setFormattedAmount] = useState('');
    const ref = useRef(null);
    const formik = useFormik({
        initialValues: {
            amount: amount.toString(),
            pin: '',
        },
        onSubmit: async (values, { setFieldError }) => {
            try {
                const amount = Number(values.amount);
                if (amount <= 0) {
                    return setFieldError(
                        'amount',
                        "You can't send less than ₦1"
                    );
                }
                if (amount > 1000000) {
                    return setFieldError(
                        'amount',
                        'Max transfer is ₦1,000,000 NGN'
                    );
                }

                if (user.balance < amount) {
                    return setFieldError(
                        'amount',
                        'Amount is bigger than available balance'
                    );
                }
                await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}user/checkPin?pin=${values.pin}`
                );

                // if (values.pin !== user.pin) {
                //     return setFieldError('pin', 'The have inserted a wrong pin');
                // }
                setAmount(amount);
                setPin(values.pin);
                setForm(3);
            } catch (error) {
                if (error.response) {
                    const errorMsg = error.response.data.msg;
                    setFieldError('pin', errorMsg);
                }
            }
        },

        validationSchema: Yup.object({
            amount: Yup.string(' ')
                .matches(/^[0-9.]+$/, 'Please enter a valid amount')
                .required('can not be empty'),
            pin: Yup.string('Please enter your 4 digits pin')
                .matches(/^\d+$/, 'Please enter your 4 digits pin')
                .matches(
                    /^[0-9][0-9][0-9][0-9]$/,
                    'Please enter your 4 digits pin'
                )

                .required('can not be empty'),
        }),
    });

    useEffect(() => {
        ref.current.focus();
        const newAmount = Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
        }).format(formik.values.amount);
        if (newAmount === '₦NaN') {
            return setFormattedAmount('₦0.00');
        }
        setFormattedAmount(newAmount);
    }, [formik.values.amount]);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex w-full flex-col items-center gap-y-8 place-self-center"
        >
            <div
                autoComplete="off"
                className=" flex w-full max-w-lg flex-col space-y-6 rounded-xl border-2  bg-neutral px-4 py-8 shadow-md sm:justify-center sm:space-y-8 sm:px-8"
                // onSubmit={formik.handleSubmit}
            >
                <h1 className="border-b text-sm font-medium sm:text-xl">
                    You are sending to{' '}
                    <span className="text-lg font-semibold capitalize text-secondary sm:text-2xl">
                        {name}
                    </span>
                </h1>
                <div
                    className={`flex w-full items-center justify-between rounded-lg `}
                >
                    <label
                        htmlFor="amount"
                        className="text-[0.8rem] font-medium sm:text-base"
                    >
                        Amount to send
                    </label>
                    <div className="flex flex-col items-end">
                        <input
                            ref={ref}
                            className={`mb-1 flex w-28 border-b bg-inherit px-2 pt-2 text-right text-base transition duration-300 focus:outline-none xsm:w-36 sm:w-44 sm:text-xl ${
                                formik.errors.amount && formik.touched.amount
                                    ? 'border-red-500 focus:border-red-500 '
                                    : 'border-gray-300 focus:border-secondary'
                            }`}
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.amount}
                            onBlur={formik.handleBlur}
                            name="amount"
                            autoComplete="off"
                            maxLength={10}
                        />
                        <p className="min-h-[1.5rem] w-full text-right text-[0.55rem]  font-medium text-red-500 2xsm:text-[0.6rem] sm:text-[0.75rem]">
                            {formik.errors.amount && formik.touched.amount
                                ? formik.errors.amount
                                : ''}
                        </p>
                    </div>
                </div>
                <p className="flex items-center gap-1 text-[0.75rem] text-gray-500 sm:text-sm">
                    <HiInformationCircle /> User would usually receive money
                    instantly{' '}
                </p>
                <p className="flex justify-between text-sm font-semibold">
                    Fee{' '}
                    <span className="font-medium text-slate-400">
                        ₦0.00 NGN
                    </span>
                </p>
                <p className="flex justify-between text-sm font-semibold">
                    You'll Pay{' '}
                    <span className="text-sm xsm:text-base sm:text-lg">
                        {formattedAmount} NGN
                    </span>
                </p>
                <div className={`flex w-full flex-col`}>
                    <label
                        htmlFor="pin"
                        className="text-sm font-medium sm:text-base"
                    >
                        Pin
                    </label>
                    <div>
                        <input
                            className={`mb-1 flex w-full rounded-md border bg-inherit px-2 py-1 text-base transition duration-300 focus:outline-none sm:text-xl ${
                                formik.errors.pin && formik.touched.pin
                                    ? 'border-red-500 focus:border-red-500 '
                                    : 'border-gray-300 focus:border-secondary'
                            }`}
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.pin}
                            onBlur={formik.handleBlur}
                            name="pin"
                            autoComplete="off"
                            maxLength={4}
                        />
                        <p className="min-h-[1.5rem] text-right text-[0.6rem] font-medium text-red-500 sm:text-[0.75rem]">
                            {formik.errors.pin && formik.touched.pin
                                ? formik.errors.pin
                                : ''}
                        </p>
                    </div>
                </div>
            </div>
            <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`group flex  w-52 items-center justify-center gap-2 rounded-lg bg-secondary py-2 text-lg text-white xsm:w-56`}
            >
                Confirm Payment
                <BsArrowRightShort className="text-xl transition-all duration-200 group-hover:translate-x-1.5" />
            </button>
            <button
                className="font-semibold text-secondary"
                type="button"
                onClick={() => {
                    setForm(1);
                    setAmount(0);
                }}
            >
                Cancel
            </button>
        </form>
    );
};

export default FormTwo;
