'use client';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import { IoMdArrowRoundBack } from 'react-icons/io';

const FormOne = ({ setEmail, setForm }) => {
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: (values, { setFieldError, setSubmitting }) => {
            setSubmitting(true);
            axios
                .get(
                    `${process.env.NEXT_PUBLIC_API_URL}user/forgotPassword?email=${values.email}`
                )
                .then((response) => {
                    setEmail(values.email);
                    setForm(2);
                })
                .catch((error) => {
                    setTimeout(() => {
                        if (error.response) {
                            const errorMsg = error.response.data.msg;
                            setFieldError('email', errorMsg);
                        }
                        setSubmitting(false);
                    }, 2000);
                });
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email('Provide a valid email address.')
                .required('Provide a valid email address.'),
        }),
    });
    return (
        <form
            onSubmit={formik.handleSubmit}
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
                        className="inline-block h-min w-10 xsm:w-12"
                        priority
                    />
                </Link>
            </div>
            <div className="mb-6 flex flex-col items-center justify-center space-y-2 text-center">
                <div className="mb-4 text-3xl">
                    <p>Reset Password</p>
                </div>
                <div className="flex max-w-[400px] flex-col text-[0.75rem] font-medium text-gray-400 2xsm:text-sm">
                    <p>
                        Enter the email address associated with your account.
                        We'll send you a link to create a new, secure password.
                    </p>
                </div>
            </div>
            <div className="h-full w-full">
                <div className="relative flex items-center justify-center">
                    <input
                        className={`h-12 w-[90%] max-w-[350px] rounded-lg border bg-inherit px-2 py-2 text-xl transition duration-300 focus:border-2 ${
                            formik.errors.email
                                ? 'border-red-500 focus:border-red-500 focus:outline-none'
                                : 'border-gray-300 focus:border-secondary focus:outline-none'
                        } `}
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        name="email"
                        autoComplete="email"
                        placeholder="Email Address"
                    />
                </div>
                <p className="flex min-h-[2rem] items-center justify-center text-center text-[0.75rem] text-red-500 2xsm:text-sm">
                    {formik.errors.email ? (
                        <span className="flex items-center gap-1">
                            <BsFillExclamationTriangleFill />{' '}
                            {formik.errors.email}
                        </span>
                    ) : (
                        ''
                    )}
                </p>
            </div>{' '}
            <div className="flex w-full flex-col items-center justify-center space-y-4">
                <button
                    disabled={formik.isSubmitting}
                    type="submit"
                    className="flex h-12 w-full items-center justify-center rounded-lg bg-secondary text-base text-white focus:outline-none"
                >
                    {formik.isSubmitting ? (
                        <PulseLoader color="white" loading={true} />
                    ) : (
                        <p>Continue</p>
                    )}
                </button>
                <div className="flex gap-1 text-center text-base">
                    <Link
                        href="/login"
                        className="flex items-center gap-1 text-gray-400"
                    >
                        <IoMdArrowRoundBack className="text-base" />
                        back to login page
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default FormOne;
