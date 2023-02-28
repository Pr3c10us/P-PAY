'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormOne from './formOne';
import FormTwo from './FormTwo';

const ForgotPassword = () => {
    const [form, setForm] = useState(1);
    const [email, setEmail] = useState('');

    const router = useRouter();

    return (
        <main className="relative grid h-full grid-cols-1 gap-0 overflow-auto   py-8 px-4 2xsm:px-8">
            {form === 1 && <FormOne setEmail={setEmail} setForm={setForm} />}
            {form === 2 && <FormTwo email={email} setForm={setForm} />}
        </main>
    );
};

export default ForgotPassword;
