'use client';
import { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import { useSearchParams, useRouter } from 'next/navigation';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

const EmailVerification = () => {
    const ref = useRef();
    const [timeLeft, setTimeLeft] = useState(10);

    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    const formik = useFormik({
        initialValues: {
            code: '',
        },
        onSubmit: (values, { setFieldError, setSubmitting }) => {
            setSubmitting(true);
            axios
                .get(
                    `${process.env.NEXT_PUBLIC_API_URL}auth/verifyCode?email=${email}&code=${values.code}`
                )
                .then((response) => {
                    return router.push('/login');
                })
                .catch((error) => {
                    setTimeout(() => {
                        if (error.response) {
                            const errorMsg = error.response.data.msg;
                            setFieldError('code', errorMsg);
                        }
                        setSubmitting(false);
                    }, 2000);
                });
        },

        validationSchema: Yup.object({
            code: Yup.string('Please enter a valid 6 digits verification code')
                .matches(
                    /^\d+$/,
                    'Please enter a valid 6 digits verification code'
                )
                .matches(
                    /^[0-9][0-9][0-9][0-9][0-9][0-9]$/,
                    'Please enter a valid 6 digits verification code'
                )
                .required('Please provide the verification code'),
        }),
    });

    const handleEffect = async () => {
        try {
            if (!email) {
                return router.push('/dashboard/home');
            }
            const isVerified = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}user/emailVerified?email=${email}`
            );
            if (isVerified.data.msg) {
                return router.push('/dashboard/home');
            }
            await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}auth/sendCode?email=${email}&authRoute=emailVerification`
            );
        } catch (error) {
            if (error.response) {
                const errorMsg = error.response.data.msg;
                formik.setFieldError('code', errorMsg);
                setTimeout(() => {
                    if (error.response.status === 404) {
                        router.push('/signup');
                    }
                }, 1500);
            }
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
        handleEffect();
        ref.current.focus();
        return () => clearInterval(interval);
    }, []);

    const handleResend = async () => {
        try {
            setTimeLeft(10);
            await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}auth/sendCode?email=${email}&resend=yes&authRoute=emailVerification`
            );
        } catch (error) {
            const errorMsg = error.response.data.msg;
            formik.setFieldError('code', errorMsg);
        }
    };

    return (
        <main className="relative bg-vector-pattern bg-small md:bg-big grid h-full grid-cols-1 gap-4 overflow-auto   py-8 px-4 2xsm:px-8">
            <form
                onSubmit={formik.handleSubmit}
                className="flex h-min w-full flex-col items-center justify-center place-self-center rounded-3xl border
            bg-white p-8 shadow-lg xsm:w-auto"
            >
                <div className="mb-6 space-y-2">
                    <Link href="/" className="">
                        <Image
                            width="65"
                            height={28}
                            alt="ppay"
                            src="/ppay-icon.svg"
                            className="inline-block h-min w-12 xsm:w-14"
                            priority
                        />
                    </Link>
                </div>
                <div className="mb-6 flex flex-col items-center justify-center space-y-2 text-center">
                    <div className="text-3xl">
                        <p>Email Verification</p>
                    </div>
                    <div className="flex max-w-[500px] flex-col text-sm font-medium text-gray-400">
                        <p>{`We have sent a code to your email ${email},Hopefully you provided a correct email address.`}</p>
                        <p></p>
                    </div>
                </div>
                <div className="h-full w-full">
                    <div className="relative flex items-center justify-center">
                        <input
                            ref={ref}
                            className={`h-14 w-[80%] max-w-[243px] rounded-lg border bg-inherit px-2 py-2 text-center text-3xl tracking-widest transition duration-300 focus:border-2 xsm:text-4xl ${
                                formik.errors.code && formik.touched.code
                                    ? 'border-red-500 focus:border-red-500 focus:outline-none'
                                    : 'border-gray-300 focus:border-secondary focus:outline-none'
                            } `}
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.code}
                            onBlur={formik.handleBlur}
                            name="code"
                            autoComplete="off"
                            maxLength="6"
                        />
                    </div>
                    <p className="flex min-h-[2rem] items-center justify-center text-center text-sm text-red-500">
                        {formik.errors.code && formik.touched.code ? (
                            <span className="flex items-center gap-1">
                                <BsFillExclamationTriangleFill />{' '}
                                {formik.errors.code}
                            </span>
                        ) : (
                            ''
                        )}
                    </p>
                </div>{' '}
                <div className="flex w-full flex-col items-center justify-center space-y-2">
                    <button
                        disabled={formik.isSubmitting}
                        type="submit"
                        className="flex h-14 w-full items-center justify-center rounded-lg bg-secondary text-base text-white focus:outline-none"
                    >
                        {formik.isSubmitting ? (
                            <PulseLoader color="white" loading={true} />
                        ) : (
                            <p>Verify Email</p>
                        )}
                    </button>
                    <div className="flex gap-1 text-center text-base">
                        <p>
                            Didn't receive code?{' '}
                            {timeLeft > 0 ? (
                                <span className="text-secondary">
                                    {'wait ' + timeLeft + 's to resend'}
                                </span>
                            ) : (
                                <button
                                    disabled={formik.isSubmitting}
                                    onClick={handleResend}
                                    className="text-secondary"
                                >
                                    Resend
                                </button>
                            )}
                        </p>
                    </div>
                </div>
            </form>
        </main>
    );
};

export default EmailVerification;
