import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaRegThumbsUp } from 'react-icons/fa';

const EditProfile = () => {
    const [user, setUser] = useState({});
    const [showSaved, setShowSaved] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEffect = async () => {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}user/userDetails`
        );
        const user = res.data.user;

        setUser(user);
    };
    useEffect(() => {
        handleEffect();
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: '',
            lastname: '',
            username: '',
        },
        // handle submit
        onSubmit: async (values, { setFieldError, setFieldTouched }) => {
            if (!values.firstname && !values.lastname && !values.username) {
                return;
            }

            const body = {
                firstname: values.firstname,
                lastname: values.lastname,
                username: values.username.toLowerCase(),
            };
            setIsSubmitting(true);
            try {
                await axios.put(
                    `${process.env.NEXT_PUBLIC_API_URL}user/editProfile`,
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
                    setFieldError('username', errorMsg);
                    setIsSubmitting(false);
                }
            }
        },
        // validation
        validationSchema: Yup.object({
            firstname: Yup.string(),
            lastname: Yup.string(),
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
                ),
        }),
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="relative h-full w-full max-w-4xl space-y-4 overflow-hidden rounded-lg border-2 pt-4"
        >
            <div className="mx-4">
                <h1 className="text-xl font-semibold">Profile Details</h1>
                <p className="text-sm font-medium text-gray-400">
                    Update your personal information.
                </p>
            </div>
            <ul className="mx-4">
                <li className="mb-4 grid gap-4 sm:grid-cols-2">
                    <div className="flex w-full flex-col">
                        <label className="font-semibold" htmlFor="firstname">
                            Firstname
                        </label>
                        <input
                            placeholder={user.firstname}
                            onChange={formik.handleChange}
                            value={formik.values.firstname}
                            onBlur={formik.handleBlur}
                            name="firstname"
                            type="text"
                            className="block h-10 w-full appearance-none rounded-lg border-2 bg-transparent px-2 text-lg  capitalize text-gray-900 transition duration-300 focus:border-[3px] focus:border-secondary focus:outline-none focus:ring-0  "
                        />
                    </div>
                    <div className="flex w-full flex-col">
                        <label className="font-semibold" htmlFor="lastname">
                            Lastname
                        </label>
                        <input
                            placeholder={user.lastname}
                            onChange={formik.handleChange}
                            value={formik.values.lastname}
                            onBlur={formik.handleBlur}
                            name="lastname"
                            type="text"
                            className="block h-10 w-full appearance-none rounded-lg border-2 bg-transparent px-2 text-lg  capitalize text-gray-900 transition duration-300 focus:border-[3px] focus:border-secondary focus:outline-none focus:ring-0  "
                        />
                    </div>
                </li>
                <li className="grid gap-4 sm:grid-cols-2">
                    <div className="flex w-full flex-1 flex-col">
                        <label className="font-semibold" htmlFor="username">
                            Username
                        </label>
                        <input
                            placeholder={user.username}
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            onBlur={formik.handleBlur}
                            name="username"
                            type="text"
                            className="block h-10 w-full appearance-none rounded-lg border-2 bg-transparent px-2 text-lg text-gray-900 transition duration-300 focus:border-[3px] focus:border-secondary focus:outline-none focus:ring-0  "
                        />
                    </div>
                    <div className="hidden sm:block"></div>
                </li>
                <p className="ml-1 mt-1 flex h-4 justify-end text-[0.75rem] font-medium text-red-500 xsm:h-2 xsm:text-sm sm:justify-start">
                    {formik.errors.username || formik.touched.username
                        ? formik.errors.username
                        : ''}
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

export default EditProfile;
