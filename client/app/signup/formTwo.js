import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { RxCross2 } from 'react-icons/rx';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

const FormTwo = ({ setForm, setUser, user, form }) => {
    const [apiError, setApiError] = useState('');
    const [showError, setShowError] = useState(false);
    const [danger, setDanger] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    // split user.dob into day, month, year
    const dob = user.dob.split('-');
    const day = dob[2];
    const month = dob[1];
    const year = dob[0];

    const formik = useFormik({
        initialValues: {
            username: user.username || '',
            day: day || '',
            month: month || '',
            year: year || '',
        },
        // handle submit
        onSubmit: async (values, { setFieldError }) => {
            try {
                setIsSubmitting(true);
                const dob = `${values.year}-${values.month}-${values.day}`;
                const username = values.username.toLowerCase();
                setUser({ ...user, username, dob });
                await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}auth/check?username=${username}`
                );
                const userInfo = { ...user, username, dob };
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}auth/signup`,
                    userInfo
                );
                setDanger(false);
                setTimeout(() => {
                    router.push(`/emailVerification?email=${user.email}`);
                }, 3000);
            } catch (error) {
                if (error.response) {
                    const errorMsg = error.response.data.msg;
                    if (
                        errorMsg.includes('username') ||
                        errorMsg.includes('username')
                    ) {
                        setFieldError('username', errorMsg);
                        setIsSubmitting(false);
                        return;
                    }
                    setDanger(true);
                    setApiError(errorMsg);
                    setShowError(true);
                    setIsSubmitting(false);
                }
            }
        },
        // validation
        validationSchema: Yup.object({
            day: Yup.string(' ')
                .matches(/^\d+$/, ' ')
                .matches(/^0[1-9]$|^1[0-9]$|^2[0-9]$|^3[0-1]$/, ' ')
                .required(' '),
            month: Yup.string(' ')
                .matches(/^\d+$/, ' ')
                .matches(/^0[1-9]$|^1[0-2]$/, ' ')
                .required(' '),
            year: Yup.string(' ')
                .matches(/^\d+$/, ' ')
                .matches(/^19[0-9][0-9]$|^20[0-9][0-9]$/, ' ')
                .required(' '),
            username: Yup.string(' ')
                .max(12, 'username gats be less than 12 characters')
                .min(3, 'username gats be more than 3 characters')
                .matches(
                    /^.*((?=.*[a-z]){1}).*$/,
                    'At least 1 letter must be in your username'
                )
                .matches(
                    /^[^@]*$/,
                    'Do not include "@" symbol in your username'
                )
                .required(' '),
        }),
    });

    return (
        <>
            <div
                className={
                    showError
                        ? `fixed z-50 bg-white ${
                              danger
                                  ? 'border-red-400  text-red-700'
                                  : 'border-black text-black'
                          } top-6 left-2 right-2 m-auto flex max-w-xl  items-center justify-between gap-4 rounded-xl border-2 px-4  py-3 transition-all  duration-500 sm:w-auto`
                        : `fixed z-50 bg-white ${
                              danger
                                  ? 'border-red-400  text-red-700'
                                  : 'border-black text-black'
                          } top-6 left-2 right-2 m-auto flex max-w-xl scale-0 items-center justify-between gap-4 rounded-xl border-2 px-4 py-3  opacity-0 transition-all  duration-500 sm:w-auto`
                }
                role="alert"
            >
                <div className="flex items-center space-x-1 text-left text-sm xsm:text-base">
                    {danger ? (
                        <strong className="text-lg font-bold xsm:text-xl">
                            Error!
                        </strong>
                    ) : (
                        ''
                    )}
                    <span
                        className={`inline capitalize ${
                            danger ? '' : 'text-base'
                        } `}
                    >
                        {apiError}
                    </span>
                </div>
                <RxCross2
                    onClick={() => setShowError(false)}
                    className={` aspect-square p-1 ${
                        danger ? 'border-red-400' : 'border-black'
                    }  cursor-pointer rounded-full border-2 bg-white text-4xl text-black xsm:text-3xl`}
                />
            </div>
            <form
                onSubmit={formik.handleSubmit}
                className="relative flex h-min w-full flex-col place-self-center rounded-3xl border
            bg-white py-16 px-8 shadow-md xsm:w-auto"
            >
                <button
                    disabled={isSubmitting}
                    type="button"
                    onClick={() => setForm(1)}
                    className="absolute top-4 left-4 flex rounded-full border border-gray-50 p-2 text-secondary shadow-lg hover:scale-110"
                >
                    <IoMdArrowRoundBack className="text-xl" />
                </button>
                <div className="mb-8 space-y-2">
                    <Link href="/" className="">
                        <Image
                            width="65"
                            height={28}
                            alt="ppay"
                            src="/ppay.svg"
                            className="inline-block h-min w-20 xsm:w-28"
                            priority
                        />
                    </Link>
                </div>
                <div className="mb-8 flex w-full flex-col items-center justify-between gap-4 space-y-2 xsm:space-y-0">
                    <div className="h-full w-full xsm:mb-8">
                        <h2 className="mb-2">Date of birth</h2>
                        <div className="w-full grid-cols-3 xsm:grid xsm:gap-4">
                            <div className="group relative z-0 mb-4 w-full xsm:mb-auto">
                                <input
                                    maxLength="2"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.day}
                                    onBlur={formik.handleBlur}
                                    name="day"
                                    className={`peer block h-10 w-full appearance-none rounded-lg border bg-transparent py-1 px-2  text-lg text-gray-900 transition duration-300 focus:border-2 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white xsm:max-w-[150px] ${
                                        formik.touched.day && formik.errors.day
                                            ? 'border-red-500 focus:border-red-600  '
                                            : 'focus:border-secondary '
                                    } `}
                                    placeholder=" "
                                    autoComplete="off"
                                />
                                <label
                                    htmlFor="day"
                                    className={`absolute top-2 left-2 z-10 origin-[0] -translate-y-[20px] scale-75 transform bg-white px-1  text-base duration-200 peer-placeholder-shown:left-2 peer-placeholder-shown:-z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-2 peer-focus:z-10 peer-focus:-translate-y-[20px] peer-focus:scale-75 peer-focus:font-medium dark:text-gray-400 peer-focus:dark:text-blue-500  `}
                                >
                                    Day{' '}
                                    <span className="text-[12px] text-gray-400">
                                        [ DD ]
                                    </span>
                                </label>
                            </div>

                            <div className="group relative z-0 mb-4 w-full xsm:mb-auto">
                                <input
                                    maxLength="2"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.month}
                                    onBlur={formik.handleBlur}
                                    name="month"
                                    className={`peer block h-10 w-full appearance-none rounded-lg border bg-transparent py-1 px-2  text-lg text-gray-900 transition duration-300 focus:border-2 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white xsm:max-w-[150px] ${
                                        formik.touched.month &&
                                        formik.errors.month
                                            ? 'border-red-500 focus:border-red-600  '
                                            : 'focus:border-secondary '
                                    } `}
                                    placeholder=" "
                                    autoComplete="off"
                                />
                                <label
                                    htmlFor="month"
                                    className={`absolute top-2 left-2 z-10 origin-[0] -translate-y-[20px] scale-75 transform bg-white px-1  text-base duration-200 peer-placeholder-shown:left-2 peer-placeholder-shown:-z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-2 peer-focus:z-10 peer-focus:-translate-y-[20px] peer-focus:scale-75 peer-focus:font-medium dark:text-gray-400 peer-focus:dark:text-blue-500  `}
                                >
                                    Month{' '}
                                    <span className="text-[12px] text-gray-400">
                                        [ MM ]
                                    </span>
                                </label>
                            </div>
                            <div className="group relative z-0 mb-4 w-full xsm:mb-auto">
                                <input
                                    maxLength="4"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.year}
                                    onBlur={formik.handleBlur}
                                    name="year"
                                    className={`peer block h-10 w-full appearance-none rounded-lg border bg-transparent py-1 px-2  text-lg text-gray-900 transition duration-300 focus:border-2 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white xsm:max-w-[150px] ${
                                        formik.touched.year &&
                                        formik.errors.year
                                            ? 'border-red-500 focus:border-red-600  '
                                            : 'focus:border-secondary '
                                    } `}
                                    placeholder=" "
                                    autoComplete="off"
                                />
                                <label
                                    htmlFor="year"
                                    className={`absolute top-2 left-2 z-10 origin-[0] -translate-y-[20px] scale-75 transform bg-white px-1  text-base duration-200 peer-placeholder-shown:left-2 peer-placeholder-shown:-z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-2 peer-focus:z-10 peer-focus:-translate-y-[20px] peer-focus:scale-75 peer-focus:font-medium dark:text-gray-400 peer-focus:dark:text-blue-500  `}
                                >
                                    Year{' '}
                                    <span className="text-[12px] text-gray-400">
                                        [ YYYY ]
                                    </span>
                                </label>
                            </div>
                        </div>
                        <p className="ml-1 mt-1 text-sm text-red-500">
                            {(formik.touched.day && formik.errors.day) ||
                            (formik.touched.month && formik.errors.month) ||
                            (formik.touched.year && formik.errors.year)
                                ? formik.errors.day ||
                                  formik.errors.month ||
                                  formik.errors.year
                                : ''}
                        </p>
                    </div>
                    <div className="h-full w-full">
                        <label
                            htmlFor="username"
                            className={`block text-black `}
                        >
                            Username
                            <span className="ml-1 text-[12px] text-gray-400">
                                (@)
                            </span>
                        </label>
                        <input
                            className={`h-10 w-full rounded-lg border px-2 py-1 focus:border-2 ${
                                formik.touched.username &&
                                formik.errors.username
                                    ? 'border-red-500'
                                    : ''
                            } bg-inherit text-xl lowercase transition duration-200 ${
                                formik.touched.username &&
                                formik.errors.username
                                    ? 'focus:border-red-500'
                                    : 'focus:border-secondary'
                            } transition duration-300 focus:outline-none`}
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            onBlur={formik.handleBlur}
                            name="username"
                            maxLength="12"
                        />
                        <p className="col-span-2 mt-1 ml-1 min-h-[2.2rem] w-full text-[0.7rem] font-semibold text-red-500 xsm:text-sm">
                            {formik.touched.username &&
                            formik.errors.username &&
                            formik.errors.username !== ' ' ? (
                                <span className="flex items-center justify-center gap-1">
                                    <BsFillExclamationTriangleFill className="text-base 2xsm:text-sm" />
                                    {`${formik.errors.username}`}
                                </span>
                            ) : (
                                ''
                            )}
                        </p>
                    </div>
                </div>
                <div className="flex w-full items-center justify-center">
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="ml-2 flex h-12 w-full max-w-sm items-center justify-center rounded-lg bg-secondary px-4 py-1 text-sm text-white focus:outline-none xsm:px-6 xsm:py-2 xsm:text-lg"
                    >
                        {isSubmitting ? (
                            <PulseLoader color="white" />
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </div>
            </form>
        </>
    );
};

export default FormTwo;
