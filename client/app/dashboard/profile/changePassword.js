import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaRegThumbsUp } from 'react-icons/fa';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const ChangePassword = () => {
    // const [user, setUser] = useState({});
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [showSaved, setShowSaved] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // const handleEffect = async () => {
    //     const res = await axios.get(
    //         `${process.env.NEXT_PUBLIC_API_URL}user/userDetails`
    //     );
    //     const user = res.data.user;

    //     setUser(user);
    // };
    // useEffect(() => {
    //     handleEffect();
    // }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        // handle submit
        onSubmit: async (values, { setFieldError, setFieldTouched }) => {
            setIsSubmitting(true);
            const body = {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
            };
            try {
                await axios.put(
                    `${process.env.NEXT_PUBLIC_API_URL}user/changePassword`,
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
                    setFieldError('oldPassword', errorMsg);
                    setIsSubmitting(false);
                }
            }
        },
        // validation
        validationSchema: Yup.object({
            oldPassword: Yup.string().required('Pass in your old Password'),
            newPassword: Yup.string()
                .matches(
                    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/,
                    'use 8+ chars, mix of letters, numbers & symbols'
                )
                .required('Provide your new Password'),
            confirmNewPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords do not match')
                .required('Confirm new Password'),
        }),
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="relative h-full w-full max-w-4xl space-y-4 overflow-hidden rounded-lg border-2 pt-4"
        >
            <div className="mx-4">
                <h1 className="text-xl font-semibold">Change Password</h1>
                {/* <p className="text-sm font-medium text-gray-400">
                    Update your login password.
                </p> */}
            </div>
            <ul className="flex w-full flex-col items-center px-4">
                <li className="relative mb-4 flex w-full max-w-md flex-col justify-center">
                    <label className="font-semibold" htmlFor="oldPassword">
                        Old Password
                    </label>
                    <input
                        onChange={formik.handleChange}
                        value={formik.values.oldPassword}
                        onBlur={formik.handleBlur}
                        name="oldPassword"
                        type={showOldPassword ? 'text' : 'password'}
                        className={`block h-10 w-full appearance-none rounded-lg border-2 bg-transparent px-2 text-lg text-gray-900 transition duration-300 focus:border-[3px] focus:outline-none focus:ring-0 ${
                            formik.touched.oldPassword &&
                            formik.errors.oldPassword
                                ? 'border-red-500 focus:border-red-500 focus:outline-none'
                                : 'border-gray-300 focus:border-secondary focus:outline-none'
                        } `}
                    />
                    <div className="">
                        {showOldPassword ? (
                            <FaRegEye
                                className="text-xsm absolute bottom-3 right-2 cursor-pointer text-gray-400"
                                onClick={() => setShowOldPassword(false)}
                            />
                        ) : (
                            <FaRegEyeSlash
                                className="text-xsm absolute bottom-3 right-2 cursor-pointer text-gray-400"
                                onClick={() => setShowOldPassword(true)}
                            />
                        )}
                    </div>
                </li>
                <li className="relative mb-4 flex w-full max-w-md flex-col justify-center">
                    <label className="font-semibold" htmlFor="newPassword">
                        New Password
                    </label>
                    <input
                        autoComplete="off"
                        onChange={formik.handleChange}
                        value={formik.values.newPassword}
                        onBlur={formik.handleBlur}
                        name="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        className={`block h-10 w-full appearance-none rounded-lg border-2 bg-transparent px-2 text-lg text-gray-900 transition duration-300 focus:border-[3px] focus:outline-none focus:ring-0 ${
                            formik.touched.newPassword &&
                            formik.errors.newPassword
                                ? 'border-red-500 focus:border-red-500 focus:outline-none'
                                : 'border-gray-300 focus:border-secondary focus:outline-none'
                        } `}
                    />
                    <div className="">
                        {showNewPassword ? (
                            <FaRegEye
                                className="text-xsm absolute bottom-3 right-2 cursor-pointer text-gray-400"
                                onClick={() => setShowNewPassword(false)}
                            />
                        ) : (
                            <FaRegEyeSlash
                                className="text-xsm absolute bottom-3 right-2 cursor-pointer text-gray-400"
                                onClick={() => setShowNewPassword(true)}
                            />
                        )}
                    </div>
                </li>
                <li className="relative mb-1 flex w-full max-w-md flex-col justify-center">
                    <label
                        className="font-semibold"
                        htmlFor="confirmNewPassword"
                    >
                        Confirm New Password
                    </label>
                    <input
                        onChange={formik.handleChange}
                        value={formik.values.confirmNewPassword}
                        onBlur={formik.handleBlur}
                        name="confirmNewPassword"
                        type={showConfirmNewPassword ? 'text' : 'password'}
                        className={`block h-10 w-full appearance-none rounded-lg border-2 bg-transparent px-2 text-lg text-gray-900 transition duration-300 focus:border-[3px] focus:outline-none focus:ring-0 ${
                            formik.touched.confirmNewPassword &&
                            formik.errors.confirmNewPassword
                                ? 'border-red-500 focus:border-red-500 focus:outline-none'
                                : 'border-gray-300 focus:border-secondary focus:outline-none'
                        } `}
                    />
                    <div className="">
                        {showConfirmNewPassword ? (
                            <FaRegEye
                                className="text-xsm absolute bottom-3 right-2 cursor-pointer text-gray-400"
                                onClick={() => setShowConfirmNewPassword(false)}
                            />
                        ) : (
                            <FaRegEyeSlash
                                className="text-xsm absolute bottom-3 right-2 cursor-pointer text-gray-400"
                                onClick={() => setShowConfirmNewPassword(true)}
                            />
                        )}
                    </div>
                </li>
                <p className="h-4 text-center text-[0.7rem] font-medium text-red-500 xsm:text-sm">
                    {(formik.touched.newPassword &&
                        formik.errors.newPassword &&
                        formik.errors.newPassword !== ' ') ||
                    (formik.touched.oldPassword && formik.errors.oldPassword) ||
                    (formik.touched.confirmNewPassword &&
                        formik.errors.confirmNewPassword &&
                        formik.errors.confirmNewPassword !== ' ') ? (
                        <span className="flex items-center justify-center gap-1">
                            {`${
                                formik.errors.oldPassword ||
                                formik.errors.newPassword ||
                                formik.errors.confirmNewPassword
                            }`}
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

export default ChangePassword;
