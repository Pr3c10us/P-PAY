'use client';
import { useState } from 'react';
import FormOne from './formOne';
import FormTwo from './formTwo';

const page = () => {
    const [form, setForm] = useState(1);
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        dob: '',
        pin: '',
    });

    return (
        <main className="relative grid gap-4 h-full grid-cols-1 overflow-auto bg-gradient-to-r from-white to-blue-100 py-8 px-4 2xsm:px-8">
            {form === 1 && (
                <FormOne setForm={setForm} setUser={setUser} user={user} form={form} />
            )}
            {form === 2 && (
                <FormTwo setForm={setForm} setUser={setUser} user={user} form={form} />
            )}
           
        </main>
    );
};

export default page;
