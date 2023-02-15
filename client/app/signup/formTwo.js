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
            phone: user.phone || '',
            day: day || '',
            month: month || '',
            year: year || '',
        },
        // handle submit
        onSubmit: async (values, { setFieldError }) => {
            try {
                setIsSubmitting(true);
                const dob = `${values.year}-${values.month}-${values.day}`;
                const phone = values.phone;
                setUser({ ...user, phone, dob });
                await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}auth/check?phone=${phone}`
                );
                const userInfo = { ...user, phone, dob };
                const res = await axios.post(
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
                        errorMsg.includes('Phone') ||
                        errorMsg.includes('phone')
                    ) {
                        setFieldError('phone', errorMsg);
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
            phone: Yup.string(' ')
                .matches(/^\d+$/, ' ')
                .matches(
                    /^0[7-9][0-1][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/,
                    ' '
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
                        : `fixed bg-white ${
                              danger
                                  ? 'border-red-400  text-red-700'
                                  : 'border-black text-black'
                          } top-6 left-2 right-2 m-auto flex max-w-xl -translate-y-[200px] items-center justify-between gap-4 rounded-xl border-2 px-4  py-3 transition-all  duration-500 sm:w-auto`
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
            </div>
            <form
                onSubmit={formik.handleSubmit}
                className="relative flex h-min w-full flex-col place-self-center rounded-3xl
            bg-white py-16 px-8 shadow-md xsm:w-auto"
            >
                <button
                    disabled={isSubmitting}
                    type="button"
                    onClick={() => setForm(1)}
                    className="absolute top-4 left-4 flex rounded-full border border-gray-50 p-2 text-[#00BAF7] shadow-lg"
                >
                    <IoMdArrowRoundBack className="text-xl" />
                </button>
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
                                            : 'focus:border-[#00baf7] '
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
                                            : 'focus:border-[#00baf7] '
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
                                            : 'focus:border-[#00baf7] '
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
                        <label htmlFor="phone" className={`block text-black `}>
                            Phone number{' '}
                            <span className="text-[12px] text-gray-400">
                                ( +234 )
                            </span>
                        </label>
                        <input
                            className={`h-10 w-full rounded-lg border px-2 py-1 focus:border-2 ${
                                formik.touched.phone && formik.errors.phone
                                    ? 'border-red-500'
                                    : ''
                            } bg-inherit text-xl transition duration-200 ${
                                formik.touched.phone && formik.errors.phone
                                    ? 'focus:border-red-500'
                                    : 'focus:border-[#00b9f7]'
                            } transition duration-300 focus:outline-none`}
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            onBlur={formik.handleBlur}
                            name="phone"
                            placeholder="0XXXXXXXXX"
                            maxLength="11"
                        />
                        <p className="ml-1 mt-1 text-sm text-red-500">
                            {formik.touched.phone && formik.errors.phone
                                ? formik.errors.phone
                                : ''}
                        </p>
                    </div>
                </div>
                <div className="flex w-full items-center justify-center">
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="ml-2 flex h-12 w-full max-w-sm items-center justify-center rounded-lg bg-[#00BAF7] px-4 py-1 text-sm text-white focus:outline-none xsm:px-6 xsm:py-2 xsm:text-lg"
                    >
                        {isSubmitting ? (
                            <PulseLoader color="white" />
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </div>
            </form>
            <div className="bottom-4 flex w-full items-center justify-center gap-2">
                <button
                    disabled={isSubmitting}
                    type="button"
                    onClick={() => setForm(1)}
                    className={`h-4 w-4 rounded-full transition-colors duration-300  ${
                        form === 1 ? 'bg-gray-300' : 'bg-white'
                    }`}
                ></button>
                <button
                    disabled={isSubmitting}
                    type="button"
                    className={`h-4 w-4 rounded-full transition-colors duration-300  ${
                        form === 2 ? 'bg-gray-300' : 'bg-white'
                    }`}
                ></button>
            </div>
        </>
    );
};

export default FormTwo;
