'use client';
import Image from 'next/image';
// import * as yup from 'yup';
import Link from 'next/link';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import '../../styles/globals.css';
import { AiOutlineLeft } from 'react-icons/ai';
import { validationSchema as formSchema } from '../../components/reducer/validationReducer';
import { useFormik } from 'formik';

const inputStyle =
    'w-full h-10  pb-0 border-b-2 border-b-gray-200 focus:border-b-[#00b9f7] transition duration-500 focus:outline-none font-bold  ';
const errorInputStyle =
    'w-full h-10 pb-0 border-b-2 border-b-red-300 transition duration-500 focus:outline-none font-bold  ';

const inputDivStyle = 'm-2 flex flex-col';

const Page = () => {
    const [show, setShow] = useState(false);
    const ref = useRef(null);
    const [step, setStep] = useState(true);

    const { values, errors, handleBlur, handleChange } = useFormik({
        initialValues: {
            'FIRST NAME': '',
            'LAST NAME': '',
            USERNAME: '',
            'EMAIL ADDRESS': '',
            'PHONE NUMBER': '',
            PASSWORD: '',
            BVN: '',
            'DATE OF BIRTH': '',
            PIN: '',
            'CONFIRM PASSWORD': '',
        },
        validationSchema: formSchema,
    });
    // make current ref focus
    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    }, [step]);

    const handleFirstSubmit = (e) => {
        e.preventDefault();
        console.log(Object.keys(errors));
        if (Object.keys(errors).length === 0) {
            setStep(false);
        }
    };
    const errorMessages = Object.values(errors);
    // console.log(errors);

    return (
        <main className="sm:px-auto flex min-h-screen flex-col items-center justify-center space-y-10  overflow-auto border-b-[#00b9f77c] bg-blue-50 py-12 md:py-24 ">
            {/* div for floating error bar */}
            {errorMessages.length > 0 && (
                <div className=" w-full h-10 bg-red-300 flex items-center justify-center text-white font-bold">
                    {errorMessages[0]}
                </div>
            )}
            <div className="flex flex-col items-center justify-center">
                <Link href="/">
                    <Image src="/ppay.svg" alt="ppay" width={160} height={40} />
                </Link>
                <h1 className=" text-xl">Create your P-pay account</h1>
            </div>
            {step && (
                <form
                    // onSubmit={handleFirstSubmit}
                    className="grid w-[90%] grid-cols-1 gap-x-9 rounded-2xl bg-white px-6 py-3 shadow-lg sm:w-[600px] sm:grid-cols-2 md:px-9 md:py-10 "
                >
                    {/* Error message div from validation

                    { && (
                        <div
                            className={
                                show
                                    ? 'fixed top-10 right-0 flex border-l-8 border-l-red-600 bg-red-600/20 py-5 px-20 text-sm text-red-500'
                                    : 'absolute top-10 right-0 hidden border-l-8 border-l-red-600 bg-red-600/20 py-5  px-20 text-sm text-red-500'
                            }
                        >
                            {}
                        </div>
                    )} */}
                    <div className={inputDivStyle}>
                        <label htmlFor="firstname">firstname</label>
                        <input
                            ref={ref}
                            value={values['FIRST NAME']}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            name="FIRST NAME"
                            id="firstname"
                            className={
                                errors['FIRST NAME']
                                    ? errorInputStyle
                                    : inputStyle
                            }
                        />
                    </div>

                    <div className={inputDivStyle}>
                        <label htmlFor="lastname">lastname</label>
                        <input
                            value={values['LAST NAME']}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            name="LAST NAME"
                            id="lastname"
                            className={
                                errors['LAST NAME']
                                    ? errorInputStyle
                                    : inputStyle
                            }
                        />
                    </div>
                    <div className={inputDivStyle}>
                        <label htmlFor="username">username</label>
                        <input
                            value={values['USERNAME']}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            name="USERNAME"
                            id="username"
                            className={
                                errors.USERNAME ? errorInputStyle : inputStyle
                            }
                        />
                    </div>
                    <div className={inputDivStyle}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            value={values['EMAIL ADDRESS']}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            name="EMAIL ADDRESS"
                            id="email"
                            className={
                                errors['EMAIL ADDRESS']
                                    ? errorInputStyle
                                    : inputStyle
                            }
                        />
                    </div>
                    <div className={inputDivStyle}>
                        <label htmlFor="phonenumber">Phone Number</label>
                        <input
                            value={values['PHONE NUMBER']}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            name="PHONE NUMBER"
                            id="phonenumber"
                            className={
                                errors['PHONE NUMBER']
                                    ? errorInputStyle
                                    : inputStyle
                            }
                        />
                    </div>
                    <div className={inputDivStyle}>
                        <label htmlFor="password">Password</label>
                        <input
                            value={values['PASSWORD']}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            name="PASSWORD"
                            id="password"
                            className={
                                errors.PASSWORD ? errorInputStyle : inputStyle
                            }
                        />
                    </div>
                    <div className={inputDivStyle}>
                        <label htmlFor="confirmpassword">
                            Confirm Password
                        </label>
                        <input
                            value={values['CONFIRM PASSWORD']}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            name="CONFIRM PASSWORD"
                            id="confirmpassword"
                            className={
                                errors['CONFIRM PASSWORD']
                                    ? errorInputStyle
                                    : inputStyle
                            }
                        />
                    </div>
                    <div className={inputDivStyle}>
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            value={values['DATE OF BIRTH']}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="date"
                            name="DATE OF BIRTH"
                            id="dob"
                            className={
                                errors['DATE OF BIRTH']
                                    ? errorInputStyle
                                    : inputStyle
                            }
                        />
                    </div>
                    <div className="my-5 flex flex-col items-center justify-center space-y-5 sm:col-span-2">
                        <button
                            onClick={handleFirstSubmit}
                            className="w-full rounded-xl bg-[#00b9f7] py-3 transition duration-300 hover:-translate-y-[3px] hover:bg-[#009ed3] hover:shadow-md"
                        >
                            Submit
                        </button>
                        <p>
                            Already have an account{' '}
                            <Link
                                href="/login"
                                className="hover:border-b-1 text-[#00b9f7] hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            )}
            {!step && (
                <form className=" grid w-[90%] grid-cols-2 gap-10 rounded-2xl bg-white p-10 shadow-lg sm:w-[600px]">
                    <button
                        onClick={() => setStep(true)}
                        className="absolute left-5 top-10 flex h-14 w-14 items-center justify-center rounded-full border-[1px] border-gray-200 bg-white shadow-md"
                    >
                        <AiOutlineLeft />
                    </button>
                    <div className={`${inputDivStyle} w-[100%]`}>
                        <label htmlFor="pin" className="">
                            BVN
                        </label>
                        <input />
                    </div>
                    <div className={`${inputDivStyle} w-[100%] `}>
                        <label htmlFor="bvn" className="">
                            pin
                        </label>
                        <input />
                    </div>
                    <div className="col-span-2 mt-5 block w-full text-center">
                        <button
                            type="submit"
                            className="w-1/2 rounded-xl bg-[#00b9f7] py-3 transition duration-300 hover:-translate-y-[3px] hover:bg-[#009ed3] hover:shadow-md"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            )}
        </main>
    );
};

export default Page;
