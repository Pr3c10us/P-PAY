import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import axios from 'axios';
import Image from 'next/image';

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
            className=" sm: flex w-full max-w-md flex-col place-self-center rounded-xl  border-2 bg-neutral px-4  py-8 shadow-md sm:justify-center sm:px-8 sm:py-8"
            onSubmit={formik.handleSubmit}
        >
            <Image
                src="/ppay.svg"
                width={50}
                height={50}
                alt="p-pay"
                className="mb-4 w-28"
                priority
            />
            <h1 className="mb-4 text-2xl font-semibold sm:text-3xl">
                Send Money
            </h1>
            <p className="mb-4 text-[0.75rem] font-medium sm:text-sm">
                Insert username of account you want to send money
            </p>
            <div className="mb-2">
                <input
                    className={`mb-1 max-h-12 min-h-[2.5rem] w-full rounded-lg border bg-inherit px-2 py-2 text-xl font-medium lowercase tracking-widest transition duration-300 focus:outline-none sm:text-2xl ${
                        formik.touched.userUsername &&
                        formik.errors.userUsername
                            ? 'border-red-500 focus:border-2 '
                            : 'border-gray-300 focus:border-2 focus:border-secondary'
                    }`}
                    type="text"
                    value={formik.values.userUsername}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="userUsername"
                    autoComplete="none"
                    placeholder="@username"
                />
                <p className="min-h-[1.5rem] w-full text-right text-[0.7rem] font-medium text-red-500 sm:text-sm">
                    {formik.touched.userUsername &&
                    formik.errors.userUsername &&
                    formik.errors.userUsername !== ' '
                        ? `${formik.errors.userUsername}`
                        : ''}
                </p>
            </div>
            <div className="flex h-full w-full justify-center">
                <button
                    type="submit"
                    className="h-12 w-full rounded-lg bg-secondary font-medium text-white sm:text-xl"
                >
                    Proceed
                </button>
            </div>
        </form>
    );
};

export default FormOne;
