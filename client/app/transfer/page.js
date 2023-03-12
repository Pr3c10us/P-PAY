'use client';
import React, { useState } from 'react';
import FormOne from './formOne';

const Transfer = () => {
    const [form, setForm] = useState(1);
    const [username, setUsername] = useState('');
    const [amount, setAmount] = useState(0);

    return (
        <main className="flex h-full items-center justify-center py-8 px-2 xsm:px-8 xsm:items-center">
            {form === 1 && <FormOne setUsername={setUsername} />}
        </main>
    );
};

export default Transfer;
