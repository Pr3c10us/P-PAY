import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaRegThumbsUp } from 'react-icons/fa';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const ChangePin = () => {
    // const [user, setUser] = useState({});
    const [showOldPin, setShowOldPin] = useState(false);
    const [showNewPin, setShowNewPin] = useState(false);
    const [showSaved, setShowSaved] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            oldPin: '',
            newPin: '',
        },
        // handle submit
        onSubmit: async (values, { setFieldError, setFieldTouched }) => {
            setIsSubmitting(true);
            const body = {
                oldPin: values.oldPin,
                newPin: values.newPin,
            };
            try {
                await axios.put(
                    `${process.env.NEXT_PUBLIC_API_URL}user/changePin`,
                    body
                );
                setShowSaved(true);
                setTimeout(() => {
                    setShowSaved(false);
                    setIsSubmitting(false);
                }, 3000);
            } catch (error) {
                if (error.response) {
                    const errorMsg = error.response.data.msg;
                    setFieldError('oldPin', errorMsg);
                    setIsSubmitting(false);
                }
            }
        },
        // validation
        validationSchema: Yup.object({
            oldPin: Yup.string()
                .matches(/^\d+$/, 'Please enter your old valid 4 digits Pin')
                .matches(
                    /^[0-9][0-9][0-9][0-9]$/,
                    'Please enter your old valid 4 digits pin'
                )
                .required('Pass in your old Pin'),
            newPin: Yup.string()
                .matches(/^\d+$/, 'Please enter a valid 4 digits Pin')
                .matches(
                    /^[0-9][0-9][0-9][0-9]$/,
                    'Please enter a valid 4 digits pin'
                )
                .required('Provide your new Pin'),
        }),
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="relative h-full w-full max-w-4xl space-y-4 overflow-hidden rounded-lg border-2 pt-4"
        >
            <div className="mx-4">
                <h1 className="text-xl font-semibold">Change Pin</h1>
                {/* <p className="text-sm font-medium text-gray-400">
                    Update your login password.
                </p> */}
            </div>
            <ul className="flex w-full flex-col items-center px-4">
                <li className="relative mb-4 flex w-full max-w-md flex-col justify-center">
                    <label className="font-semibold" htmlFor="oldPin">
                        Old Pin
                    </label>
                    <input
                        maxLength={4}
                        onChange={formik.handleChange}
                        value={formik.values.oldPin}
                        onBlur={formik.handleBlur}
                        name="oldPin"
                        type={showOldPin ? 'text' : 'password'}
                        className={`block h-10 w-full appearance-none rounded-lg border-2 bg-transparent px-2 text-lg text-gray-900 transition duration-300 focus:border-[3px] focus:outline-none focus:ring-0 ${
                            formik.touched.oldPin && formik.errors.oldPin
                                ? 'border-red-500 focus:border-red-500 focus:outline-none'
                                : 'border-gray-300 focus:border-secondary focus:outline-none'
                        } `}
                    />
                    <div className="">
                        {showOldPin ? (
                            <FaRegEye
                                className="text-xsm absolute bottom-3 right-2 cursor-pointer text-gray-400"
                                onClick={() => setShowOldPin(false)}
                            />
                        ) : (
                            <FaRegEyeSlash
                                className="text-xsm absolute bottom-3 right-2 cursor-pointer text-gray-400"
                                onClick={() => setShowOldPin(true)}
                            />
                        )}
                    </div>
                </li>
                <li className="relative mb-4 flex w-full max-w-md flex-col justify-center">
                    <label className="font-semibold" htmlFor="newPin">
                        New Pin
                    </label>
                    <input
                        maxLength={4}
                        autoComplete="off"
                        onChange={formik.handleChange}
                        value={formik.values.newPin}
                        onBlur={formik.handleBlur}
                        name="newPin"
                        type={showNewPin ? 'text' : 'password'}
                        className={`block h-10 w-full appearance-none rounded-lg border-2 bg-transparent px-2 text-lg text-gray-900 transition duration-300 focus:border-[3px] focus:outline-none focus:ring-0 ${
                            formik.touched.newPin && formik.errors.newPin
                                ? 'border-red-500 focus:border-red-500 focus:outline-none'
                                : 'border-gray-300 focus:border-secondary focus:outline-none'
                        } `}
                    />
                    <div className="">
                        {showNewPin ? (
                            <FaRegEye
                                className="text-xsm absolute bottom-3 right-2 cursor-pointer text-gray-400"
                                onClick={() => setShowNewPin(false)}
                            />
                        ) : (
                            <FaRegEyeSlash
                                className="text-xsm absolute bottom-3 right-2 cursor-pointer text-gray-400"
                                onClick={() => setShowNewPin(true)}
                            />
                        )}
                    </div>
                </li>

                <p className="h-4 text-center text-[0.7rem] font-medium text-red-500 xsm:text-sm">
                    {(formik.touched.newPin &&
                        formik.errors.newPin &&
                        formik.errors.newPin !== ' ') ||
                    (formik.touched.oldPin && formik.errors.oldPin) ? (
                        <span className="flex items-center justify-center gap-1">
                            {`${formik.errors.oldPin || formik.errors.newPin}`}
                        </span>
                    ) : (
                        ''
                    )}
                </p>
            </ul>

            <div className="relative flex w-full justify-end bg-secondary bg-opacity-[0.03] px-4 py-2.5">
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className={`rounded-lg bg-secondary px-4 py-2 text-white ${
                        isSubmitting ? 'bg-opacity-60' : ''
                    }`}
                >
                    Save
                </button>
                <h2
                    className={`absolute left-5 top-4 flex text-xl font-semibold text-green-600 underline transition-all duration-500 ease-in ${
                        showSaved
                            ? ' scale-100'
                            : '-translate-x-96 transition-none'
                    }`}
                >
                    Saved
                </h2>
            </div>
        </form>
    );
};

export default ChangePin;
