import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import axios from 'axios';

const FormOne = ({ setName, setForm, setUsername, user }) => {
    const formik = useFormik({
        initialValues: {
            userUsername: '',
        },
        onSubmit: (values, { setFieldError, setSubmitting }) => {
            const username = values.userUsername.toLowerCase().split('@')[1];
            if (username === user.username) {
                return setFieldError(
                    'userUsername',
                    "You can't send cash to yourself"
                );
            }

            axios(
                `${process.env.NEXT_PUBLIC_API_URL}user/checkUser/${username}`,
                {
                    method: 'GET',
                }
            )
                .then((response) => {
                    const user = response.data.user;
                    setName(`${user.firstname} ${user.lastname}`);
                    setUsername(username);
                    return setForm(2);
                })
                .catch((error) => {
                    if (error.response) {
                        const errorMsg = error.response.data.msg;
                        setFieldError('userUsername', errorMsg);
                    }
                    setSubmitting(false);
                });
        },

        // validation
        validationSchema: Yup.object({
            userUsername: Yup.string(' ')
                .required('can not be empty')
                .min(4, 'too short')
                .matches(/^@/, 'Username must start with "@" symbol')
                .matches(/^@[^@]*$/, 'Invalid username'),
        }),
    });
    return (
        <form
            autoComplete="off"
            className=" flex w-full max-w-xl flex-col space-y-2 place-self-center rounded-xl border  bg-neutral px-2 pt-4 pb-4 shadow-md sm:justify-center sm:space-y-4 sm:px-8 sm:pt-8"
            onSubmit={formik.handleSubmit}
        >
            <h1 className="text-2xl font-medium sm:text-3xl">Send Money</h1>
            <p className="text-[0.75rem] sm:text-base">
                Insert username of account you want to send money
            </p>
            <div className="">
                <input
                    className={`mb-1 max-h-10 min-h-[2.5rem] w-full border-b bg-inherit px-2 pt-2 text-xl lowercase tracking-widest transition duration-300 focus:outline-none sm:text-2xl ${
                        formik.touched.userUsername &&
                        formik.errors.userUsername
                            ? 'border-red-500 focus:border-b-2 '
                            : 'border-gray-300 focus:border-b-2 focus:border-secondary'
                    }`}
                    type="text"
                    value={formik.values.userUsername}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="userUsername"
                    autoComplete="none"
                    placeholder="@username"
                />
                <p className="min-h-[1.5rem] w-full text-right text-[0.7rem] font-medium text-red-500 sm:min-h-[2.2rem] sm:text-sm">
                    {formik.touched.userUsername &&
                    formik.errors.userUsername &&
                    formik.errors.userUsername !== ' '
                        ? `${formik.errors.userUsername}`
                        : ''}
                </p>
            </div>
            <div className="flex w-full justify-center">
                <button
                    type="submit"
                    className="w-32 rounded-lg bg-secondary py-1.5 text-white sm:w-44 sm:py-2 sm:text-xl"
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default FormOne;
