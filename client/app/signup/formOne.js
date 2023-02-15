import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { RxCross2 } from 'react-icons/rx';
import { CgDanger } from 'react-icons/cg';

const FormOne = ({ setForm, setUser, user, form }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [apiError, setApiError] = useState('');
    const [showError, setShowError] = useState(false);
    const [danger, setDanger] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstname: user.firstname || '',
            lastname: user.lastname || '',
            email: user.email || '',
            password: user.password || '',
            confirmPassword: '',
        },
        // handle submit
        onSubmit: async (values, { setFieldError }) => {
            try {
                await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}auth/check?email=${values.email}`
                );
                const { confirmPassword, ...rest } = values;
                setUser({ ...user, ...rest });
                setForm(2);
            } catch (error) {
                if (error.response) {
                    const errorMsg = error.response.data.msg;
                    if (
                        errorMsg.includes('email') ||
                        errorMsg.includes('Email')
                    ) {
                        setFieldError('email', errorMsg);
                        return;
                    }
                    setDanger(true);
                    setApiError(errorMsg);
                    setShowError(true);
                }
            }
        },
        // validation
        validationSchema: Yup.object({
            firstname: Yup.string().required(' '),
            lastname: Yup.string().required(' '),
            email: Yup.string().email(' ').required(' '),
            password: Yup.string()
                .matches(
                    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/,
                    '!!! Use 8 or more characters with a mix of letters, numbers & symbols.'
                )
                .required(' '),
            confirmPassword: Yup.string()
                .oneOf(
                    [Yup.ref('password'), null],
                    '!!! Passwords do not match.'
                )
                .required(' '),
        }),
    });

    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                className="flex h-min w-full flex-col place-self-center rounded-3xl
            bg-white p-8 shadow-lg xsm:w-auto"
            >
                <div
                    className={
                        showError
                            ? `fixed ${
                                  danger
                                      ? 'border-red-400 bg-red-100 text-red-700'
                                      : 'border-green-400 bg-green-100 text-green-700'
                              } top-6 left-2 flex w-[80%] items-center justify-between gap-4 rounded border px-4  py-3 transition-all  duration-300 xsm:left-6 sm:w-auto`
                            : `fixed ${
                                  danger
                                      ? 'border-red-400 bg-red-100 text-red-700'
                                      : 'border-green-400 bg-green-100 text-green-700'
                              } top-6 left-2 flex w-[80%] -translate-x-[500px] items-center justify-between gap-4 rounded border px-4  py-3 transition-all  duration-300 xsm:left-6 sm:w-auto`
                    }
                    role="alert"
                >
                    <div className="flex items-center space-x-1 text-center text-sm xsm:text-base">
                        {danger ? (
                            <strong className="text-lg font-bold xsm:text-xl">
                                Error!
                            </strong>
                        ) : (
                            ''
                        )}
                        <span
                            className={`inline capitalize ${
                                danger ? '' : 'text-lg'
                            } `}
                        >
                            {apiError}
                        </span>
                    </div>
                    <RxCross2
                        onClick={() => setShowError(false)}
                        className="cursor-pointer text-4xl text-black xsm:text-3xl"
                    />
                </div>{' '}
                <div className="mb-8 space-y-2">
                    <Link href="/" className="">
                        <Image
                            width="65"
                            height={28}
                            alt="ppay"
                            src="./ppay.svg"
                            className="inline-block h-min w-20 xsm:w-28"
                            priority
                        />
                    </Link>
                    <h2 className="text-lg xsm:text-xl">
                        Create your P-pay account
                    </h2>
                </div>
                <div className="mb-8 w-full space-y-2">
                    <div className="grid-cols-2 items-center justify-between gap-4 space-y-2 xsm:grid xsm:space-y-0">
                        <div className="h-full w-full">
                            <label
                                htmlFor="firstname"
                                className={`block text-black `}
                            >
                                First name
                            </label>
                            <input
                                className={`h-10 w-full rounded-lg border bg-inherit px-2 py-1 text-xl capitalize transition duration-300 focus:border-2 active:ring-0 xsm:max-w-[243px] ${
                                    formik.touched.firstname &&
                                    formik.errors.firstname
                                        ? 'border-red-500 focus:border-red-500 focus:outline-none'
                                        : 'border-gray-300  focus:border-[#00b9f7] focus:outline-none'
                                } `}
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.firstname}
                                onBlur={formik.handleBlur}
                                name="firstname"
                            />
                            <p className="ml-1 mt-1 text-sm text-red-500">
                                {formik.touched.firstname &&
                                formik.errors.firstname
                                    ? formik.errors.firstname
                                    : ''}
                            </p>
                        </div>
                        <div className="h-full w-full">
                            <label
                                htmlFor="lastname"
                                className={`block text-black `}
                            >
                                Last name
                            </label>
                            <input
                                className={`h-10 w-full rounded-lg border bg-inherit px-2 py-1 text-xl capitalize transition duration-300 focus:border-2 focus:ring-0 xsm:max-w-[243px] ${
                                    formik.touched.lastname &&
                                    formik.errors.lastname
                                        ? 'border-red-500 focus:border-red-500 focus:outline-none'
                                        : 'border-gray-300  focus:border-[#00b9f7] focus:outline-none'
                                } `}
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.lastname}
                                onBlur={formik.handleBlur}
                                name="lastname"
                            />
                            <p className="ml-1 mt-1 text-sm text-red-500">
                                {formik.touched.lastname &&
                                formik.errors.lastname
                                    ? formik.errors.lastname
                                    : ''}
                            </p>
                        </div>
                    </div>
                    <div>
                        <label className={`block text-black `} htmlFor="email">
                            Email address
                        </label>
                        <input
                            className={`h-10 w-full rounded-lg border bg-inherit px-2 py-1 text-xl transition duration-300 focus:border-2 focus:ring-0 ${
                                formik.touched.email && formik.errors.email
                                    ? 'border-red-500 focus:border-red-500 focus:outline-none'
                                    : 'border-gray-300  focus:border-[#00b9f7] focus:outline-none'
                            } `}
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            name="email"
                            autoComplete="email"
                            placeholder="yourEmail@something.com"
                        />
                        <p className="ml-1 mt-1 text-sm text-red-500">
                            {formik.touched.email && formik.errors.email
                                ? formik.errors.email
                                : ''}
                        </p>
                    </div>
                </div>
                <div className="mb-8 w-full grid-cols-2 items-center justify-between gap-y-1 gap-x-4 space-y-2 xsm:grid xsm:space-y-0">
                    <div className="h-full w-full">
                        <div className="relative">
                            <label
                                htmlFor="password"
                                className={`block text-black `}
                            >
                                Password
                            </label>
                            <input
                                className={`h-10 w-full rounded-lg border bg-inherit px-2 py-1 pr-8 text-xl transition duration-300 focus:border-2 focus:ring-0 xsm:max-w-[243px] ${
                                    formik.touched.password &&
                                    formik.errors.password
                                        ? 'border-red-500 focus:border-red-500 focus:outline-none'
                                        : 'border-gray-300  focus:border-[#00b9f7] focus:outline-none'
                                } `}
                                type={showPassword ? 'text' : 'password'}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                name="password"
                                autoComplete="password"
                            />
                            <div className="">
                                {showPassword ? (
                                    <FaRegEye
                                        className="text-xsm absolute bottom-3 right-2 cursor-pointer text-gray-400"
                                        onClick={() => setShowPassword(false)}
                                    />
                                ) : (
                                    <FaRegEyeSlash
                                        className="text-xsm absolute bottom-3 right-2 cursor-pointer text-gray-400"
                                        onClick={() => setShowPassword(true)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="h-full w-full">
                        <div className="relative">
                            <label
                                className={`block text-black `}
                                htmlFor="confirmPassword"
                            >
                                Confirm Password
                            </label>
                            <input
                                className={`h-10 w-full rounded-lg border bg-inherit px-2 py-1 pr-8 text-xl transition duration-300 focus:border-2 focus:ring-0 xsm:max-w-[243px] ${
                                    formik.touched.confirmPassword &&
                                    formik.errors.confirmPassword
                                        ? 'border-red-500 focus:border-red-500 focus:outline-none'
                                        : 'border-gray-300  focus:border-[#00b9f7] focus:outline-none'
                                } `}
                                type={showConfirmPassword ? 'text' : 'password'}
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                                onBlur={formik.handleBlur}
                                name="confirmPassword"
                                autoComplete="password"
                            />
                            <div className="">
                                {showConfirmPassword ? (
                                    <FaRegEye
                                        className="text-xsm absolute bottom-3 right-2 cursor-pointer text-gray-400"
                                        onClick={() =>
                                            setShowConfirmPassword(false)
                                        }
                                    />
                                ) : (
                                    <FaRegEyeSlash
                                        className="text-xsm absolute bottom-3 right-2 cursor-pointer text-gray-400"
                                        onClick={() =>
                                            setShowConfirmPassword(true)
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <p className="col-span-2 ml-1 text-sm text-red-500">
                        {(formik.touched.password && formik.errors.password) ||
                        (formik.touched.confirmPassword &&
                            formik.errors.confirmPassword)
                            ? formik.errors.password ||
                              formik.errors.confirmPassword
                            : ''}
                    </p>
                </div>
                <div className="flex w-full flex-col items-center gap-4">
                    <button
                        type="submit"
                        className="h-12 w-full max-w-sm  rounded-lg bg-[#00BAF7] px-4 py-1 text-lg text-white focus:outline-none xsm:px-6 xsm:py-2"
                    >
                        Continue
                    </button>
                    <p className="text-sm">
                        <span>Have an account?</span>
                        <Link
                            href="/login"
                            className=" ml-1 inline-block h-min text-base text-[#00BAF7]"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </form>
            <div className="bottom-4 flex w-full items-center justify-center gap-2">
                <button
                    type="button"
                    className={`h-4 w-4 rounded-full transition-colors duration-300  ${
                        form === 1 ? 'bg-gray-300' : 'bg-white'
                    }`}
                ></button>
                <button
                    type="button"
                    onClick={formik.handleSubmit}
                    className={`h-4 w-4 rounded-full transition-colors duration-300  ${
                        form === 2 ? 'bg-gray-300' : 'bg-white'
                    }`}
                ></button>
            </div>
        </>
    );
};

export default FormOne;
