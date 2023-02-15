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
import { useRouter } from 'next/navigation';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        onSubmit: (values, { setFieldError, setSubmitting }) => {
            setSubmitting(true);
            axios.defaults.withCredentials = true;
            axios(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
                method: 'POST',
                data: values,
                withCredentials: true,
            })
                .then((response) => {
                    return router.push(`/twoFactor?email=${values.email}`);
                })
                .catch((error) => {
                    setTimeout(() => {
                        if (error.response) {
                            setErrorMsg(error.response.data.msg);
                            if (error.response.data.msg.includes('email')) {
                                setFieldError('email', ' ');
                            }
                            if (error.response.data.msg.includes('password')) {
                                setFieldError('password', ' ');
                            }
                        }
                        setSubmitting(false);
                    }, 2000);
                });
        },

        validationSchema: Yup.object({
            email: Yup.string().email(' ').required(' '),
            password: Yup.string().required(' '),
        }),
    });

    return (
        <main className="relative grid h-full grid-cols-1 gap-4 overflow-auto bg-gradient-to-r from-white to-blue-100 px-4 py-8 2xsm:px-8">
            <form
                onSubmit={formik.handleSubmit}
                className="flex h-min w-full flex-col place-self-center rounded-3xl
            bg-white p-10  shadow-lg xsm:w-auto xsm:px-20"
            >
                <div className="fa-solid fa-user flex w-full items-center justify-center">
                    <Link href="/" className="">
                        <Image
                            width="65"
                            height={28}
                            alt="ppay"
                            src="./ppay.svg"
                            className="inline-block h-min w-28 xsm:w-32"
                            priority
                        />
                    </Link>
                </div>
                <div className="mb-8 mt-4 flex flex-col items-center justify-center space-y-2 text-center">
                    <div className="text-2xl xsm:text-3xl">
                        <p>Sign in</p>
                    </div>
                </div>
                <div className="flex w-full flex-col items-center justify-center">
                    <div className="group relative z-0 mb-4 w-full">
                        <input
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            name="email"
                            className={`peer block h-12 w-full appearance-none rounded-lg border bg-transparent py-1 px-2 text-xl  text-gray-900 transition duration-300 focus:border-2 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white xsm:w-80 ${
                                formik.touched.email && formik.errors.email
                                    ? 'border-red-500 focus:border-red-600  '
                                    : 'focus:border-[#00baf7] '
                            } `}
                            placeholder=" "
                            autoComplete="email"
                        />
                        <label
                            htmlFor="email"
                            className={`absolute top-3 left-2 z-10 origin-[0] -translate-y-[20px] scale-75 transform bg-white px-1  text-base duration-200 peer-placeholder-shown:left-2 peer-placeholder-shown:-z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-2 peer-focus:z-10 peer-focus:-translate-y-[24px] peer-focus:scale-75 peer-focus:font-medium dark:text-gray-400 peer-focus:dark:text-blue-500  `}
                        >
                            Email
                        </label>
                    </div>
                    <div className="group relative z-0 mb-2 w-full">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            name="password"
                            className={`peer block h-12 w-full appearance-none rounded-lg border bg-transparent py-1 px-2 pr-8 text-xl text-gray-900  transition duration-300  focus:border-2 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white xsm:w-80 ${
                                formik.touched.password &&
                                formik.errors.password
                                    ? 'border-red-500 focus:border-red-600  '
                                    : 'focus:border-[#00baf7] '
                            } `}
                            placeholder=" "
                            autoComplete="current-password"
                        />
                        <label
                            htmlFor="password"
                            className={`absolute top-3 left-2 z-10 origin-[0] -translate-y-[20px] scale-75 transform bg-white px-1  text-base duration-200 peer-placeholder-shown:left-2 peer-placeholder-shown:-z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-2 peer-focus:z-10 peer-focus:-translate-y-[24px] peer-focus:scale-75 peer-focus:font-medium dark:text-gray-400 peer-focus:dark:text-blue-500  `}
                        >
                            Password
                        </label>
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
                    <p className="flex min-h-[1.5rem] max-w-[20rem] text-[0.7rem] font-semibold text-red-500">
                        {errorMsg ? (
                            <span className="flex items-center justify-center gap-1">
                                <BsFillExclamationTriangleFill className="text-base 2xsm:text-sm" />
                                {errorMsg}
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
                        className="h-12 w-full max-w-sm  rounded-lg bg-[#00BAF7] px-4 py-1 text-lg text-white focus:outline-none"
                    >
                        {formik.isSubmitting ? (
                            <PulseLoader color="white" loading={true} />
                        ) : (
                            <p>Sign in</p>
                        )}
                    </button>
                    <Link
                        href="/forgotPassword"
                        className="inline-block h-min text-base text-gray-400"
                    >
                        Forgot password ?
                    </Link>
                    <p className="text-sm">
                        <span>Don't have an account ?</span>
                        <Link
                            href="/signup"
                            className="ml-1 inline-block h-min text-[#00BAF7]"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </form>{' '}
        </main>
    );
};

export default Login;
