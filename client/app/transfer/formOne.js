import React, { useState } from 'react';
import { useFormik } from 'formik';

const FormOne = ({ setUsername }) => {
    const [name, setName] = useState('');
    const [step, setStep] = useState(1);

    const formik = useFormik({
        initialValues: {
            userUsername: '',
        },
    });
    return (
        <form
            autoComplete="off"
            className="flex w-full max-w-xl flex-col space-y-4 rounded-b-md border border-t-4 border-t-secondary xsm:pt-8 xsm:pb-4 pt-4 pb-2 shadow-md xsm:justify-center px-2 xsm:px-8"
            onSubmit={formik.handleSubmit}
        >
            <h1 className="text-2xl font-medium xsm:text-3xl">Send Money</h1>
            <p className="text-sm xsm:text-base">
                Insert username of account you want to send money
            </p>
            <div className="">
                <input
                    className={`w-full border-b border-gray-300 bg-inherit px-2 pt-2 text-lg tracking-widest transition duration-300 focus:border-b-2 focus:border-secondary focus:outline-none xsm:pt-3 xsm:text-xl`}
                    type="text"
                    value={formik.values.userUsername}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="userUsername"
                    autoComplete="none"
                    placeholder="Email or @username"
                />
                <p className={`h-4 w-full`}>{name}</p>
            </div>
            <div className="flex w-full justify-center">
                <button className="w-32 bg-secondary py-2 text-white xsm:w-44 xsm:text-xl">
                    Next
                </button>
            </div>
        </form>
    );
};

export default FormOne;
