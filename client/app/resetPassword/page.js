'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { IoMdArrowRoundBack } from 'react-icons/io';
import FormOne from './formOne';
import FormTwo from './FormTwo';

const ResetPassword = () => {
    const [form, setForm] = useState(1);

    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || '';

    useEffect(() => {
        if (!token) {
            return router.push('forgotPassword');
        }
    }, []);

    return (
        <main className="relative grid h-full grid-cols-1 gap-4 overflow-auto bg-vector-pattern bg-small md:bg-big   px-4 py-8 2xsm:px-8">
            {form === 1 && (
                <FormOne token={token} setForm={setForm} router={router} />
            )}
            {form === 2 && <FormTwo />}
        </main>
    );
};

export default ResetPassword;
