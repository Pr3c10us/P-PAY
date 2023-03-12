'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import axios from 'axios';
import { IoMdArrowRoundBack } from 'react-icons/io';

const FormOne = ({ token, setForm, router }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },

        onSubmit: (values, { setFieldError, setSubmitting }) => {
            setSubmitting(true);
            axios.defaults.withCredentials = true;
            axios(`${process.env.NEXT_PUBLIC_API_URL}user/resetPassword`, {
                method: 'POST',
                data: { token, password: values.password },
                withCredentials: true,
            })
                .then((response) => {
                    setSubmitting(false);
                    return setForm(2);
                })
                .catch((error) => {
                    setTimeout(() => {
                        if (error.response) {
                            setFieldError('password', error.response.data.msg);
                        }
                        setTimeout(() => router.push('forgotPassword'), 2000);
                    }, 2000);
                });
        },

        validationSchema: Yup.object({
            password: Yup.string()
                .matches(
                    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/,
                    'use 8+ chars, mix of letters, numbers & symbols'
                )
                .required('Fill all field'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords do not match')
                .required('Fill all field'),
        }),
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex h-min w-full flex-col place-self-center rounded-3xl border
            bg-white p-10  shadow-lg xsm:w-auto xsm:px-20"
        >
            <div className="fa-solid fa-user flex w-full items-center justify-center">
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

            <div className="mb-8 mt-4 flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-2xl xsm:text-3xl">
                    <p>Set new Password</p>
                </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center">
                <div className="group relative z-0 mb-2 w-full">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        name="password"
                        className={`peer block h-12 w-full appearance-none rounded-lg border bg-transparent py-1 px-2 pr-8 text-sm text-gray-900 transition  duration-300 focus:border-2  focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white 2xsm:text-xl xsm:w-80 ${
                            formik.touched.password && formik.errors.password
                                ? 'border-red-500 focus:border-red-600  '
                                : 'focus:border-secondary '
                        } `}
                        placeholder="Enter new Password"
                        autoComplete="password"
                    />
                    <div className="">
                        {showPassword ? (
                            <FaRegEye
                                className=" absolute bottom-3.5 right-2 cursor-pointer text-lg text-gray-400"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <FaRegEyeSlash
                                className=" absolute bottom-3.5 right-2 cursor-pointer text-lg text-gray-400"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                </div>
                <div className="group relative z-0 w-full">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        onBlur={formik.handleBlur}
                        name="confirmPassword"
                        className={`peer mt-2 block h-12 w-full appearance-none rounded-lg border bg-transparent py-1 px-2 pr-8 text-sm text-gray-900 transition  duration-300 focus:border-2  focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white 2xsm:text-xl xsm:w-80 ${
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                                ? 'border-red-500 focus:border-red-600  '
                                : 'focus:border-secondary '
                        } `}
                        placeholder="Re-enter Password"
                        autoComplete="password"
                    />
                    <div className="">
                        {showConfirmPassword ? (
                            <FaRegEye
                                className=" absolute bottom-3.5 right-2 cursor-pointer text-lg text-gray-400"
                                onClick={() => setShowConfirmPassword(false)}
                            />
                        ) : (
                            <FaRegEyeSlash
                                className=" absolute bottom-3.5 right-2 cursor-pointer text-lg text-gray-400"
                                onClick={() => setShowConfirmPassword(true)}
                            />
                        )}
                    </div>
                </div>
                <p className="flex min-h-[2.2rem] max-w-[20rem] text-[0.55rem] font-semibold text-red-500 2xsm:text-[0.7rem]">
                    {(formik.touched.password && formik.errors.password) ||
                    (formik.touched.confirmPassword &&
                        formik.errors.confirmPassword) ? (
                        <span className="flex items-center justify-center gap-1">
                            <BsFillExclamationTriangleFill className="text-base 2xsm:text-sm" />
                            {`${
                                formik.errors.password ||
                                formik.errors.confirmPassword
                            }`}
                        </span>
                    ) : (
                        ''
                    )}
                </p>
            </div>
            <div className="mt-2 flex w-full flex-col items-center gap-4 text-center">
                <button
                    disabled={formik.isSubmitting}
                    type="submit"
                    className="h-12 w-full max-w-sm rounded-lg bg-secondary px-4 py-1 text-lg text-white focus:outline-none"
                >
                    {formik.isSubmitting ? (
                        <PulseLoader color="white" loading={true} />
                    ) : (
                        <p>Reset Password</p>
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
